const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

class Message {
  constructor(client, redis) {
    this.client = client;
    this.redis = redis;
  }

  async run(message) {
    if (message.author.bot) return;

    let prefix = await this.redis.get(message.channel.guild.id);
    if (!prefix) prefix = this.client.defaultPrefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (this.client.commands[command]) {
      this.client.commands[command].run(message, args);
    } else {
      message.channel.send(`\`Command not found. Please run ${prefix}help for a list of all commands\``);
    }
  }
}

module.exports = Message;
