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
  // Event Loader
  const evtFiles = await readdir(path.join(__dirname, 'events'));
  console.log(`Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const evtName = file.split('.')[0];
    const evt = new (require('./events/' + file))(client, redisClient);
    client.on(evtName, (...args) => evt.run(...args));
  });

  // Command Loader
  const cmdFiles = await readdir(path.join(__dirname, 'commands'));
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const cmdName = file.split('.')[0];
    client.loadCommand(cmdName);
  });

  // Login
  client.login(client.token);
})();
