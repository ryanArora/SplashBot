const config = require('./config.js');
const { Client } = require('discord.js');

class SplashBot extends Client {
  constructor(options) {
    super(options);
    this.config = config;
    this.prefix = '!';
  }
}

module.exports = SplashBot;
