require('dotenv').config();
const { Client } = require('discord.js');

class SplashBot extends Client {
  constructor(options) {
    super(options);
    this.defaultPrefix = 'sb ';
    this.config = {
      token: process.env.DISCORD_TOKEN,
    };
  }
}

module.exports = SplashBot;
