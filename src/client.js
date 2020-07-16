const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const SplashBot = require('./bot.js');

const readdir = promisify(fs.readdir);

const client = new SplashBot();

(async () => {
  // Event Handler
  const evtFiles = await readdir(path.join(__dirname, 'events'));
  console.log(`Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const evtName = file.split('.')[0];
    const evt = new (require('./events/' + file))(client);
    client.on(evtName, (...args) => evt.run(...args));
  });

  // Login
  client.login(client.config.token);
})();
