require('dotenv').config();
const path = require('path');
const { Client } = require('discord.js');
const redis = require('./redisClient');

class SplashBot extends Client {
  constructor(options) {
    super(options);
    this.settings = {
      defaultPrefix: '!sb',
      token: process.env.DISCORD_TOKEN,
    };
    this.redis = redis;
    this.commands = {};
  }

  loadCommand(command) {
    this.commands[command] = new (require(path.join(__dirname, 'commands', command)))(this, this.redis);
  }
}

module.exports = SplashBot;
