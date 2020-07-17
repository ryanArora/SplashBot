const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

class Message {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;
    if (message.guild === null) return;

    let prefix = await this.client.redis.get(message.channel.guild.id);
    if (prefix === null) prefix = this.client.setings.defualtPrefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (this.client.commands[command]) {
      this.client.commands[command].run(message, args);
    } else {
      message.channel.send(`\`Command not found. Please run ${prefix}${prefix.length > 1 ? ' ' : ''}help for a list of all commands\``);
    }
  }
}

module.exports = Message;
