require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const redis = require('redis');
const SplashBot = require('./client.js');

const readdir = promisify(fs.readdir);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.get = promisify(redisClient.get);
redisClient.set = promisify(redisClient.set);

const client = new SplashBot();
(async () => {
  // Event Handler
  const evtFiles = await readdir(path.join(__dirname, 'events'));
  console.log(`Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const evtName = file.split('.')[0];
    const evt = new (require('./events/' + file))(client, redisClient);
    client.on(evtName, (...args) => evt.run(...args));
  });

  // Login
  client.login(client.config.token);
})();
