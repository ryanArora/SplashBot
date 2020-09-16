const fs = require('fs');
const path = require('path');

const message = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${client.settings.prefix}\``);
  }

  if (!message.content.startsWith(client.settings.prefix)) return;

  const args = message.content.trim().slice(client.settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  message.args = args;

  if (client.commands[command]) {
    client.commands[command](client, message);
  } else {
    message.channel.send(`\`Command not found. Please run ${client.settings.prefix}help for a list of all commands\``);
  }
};

module.exports = message;
