require('dotenv').config();
const path = require('path');
const { Client } = require('discord.js');

class SplashBot extends Client {
  constructor(options) {
    super(options);
    this.defaultPrefix = 'sb ';
    this.token = process.env.DISCORD_TOKEN;
    this.commands = {};
  }

  loadCommand(command) {
    this.commands[command] = new (require(path.join(__dirname, 'commands', command)))();
  }
}

module.exports = SplashBot;
