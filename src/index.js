if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Discord = require('discord.js');

const readdir = promisify(fs.readdir);

const client = new Discord.Client();

client.settings = {
  prefix: '!',
};

(async () => {
  // Event Loader
  const evtFiles = await readdir(path.join(__dirname, 'events'));
  console.log(`Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const evtName = file.split('.')[0];
    const evt = require('./events/' + file);

    client.on(evtName, (...args) => {
      evt(client, ...args);
    });
  });

  // Command Loader
  const cmdFiles = await readdir(path.join(__dirname, 'commands'));
  console.log(`Loading a total of ${cmdFiles.length} commands.`);

  client.commands = {};

  cmdFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const cmdName = file.split('.')[0];
    client.commands[cmdName] = require(`./commands/${file}`);
  });

  // Login
  client.login(process.env.DISCORD_TOKEN);
})();
