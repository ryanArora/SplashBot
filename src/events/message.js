const fs = require('fs');
const path = require('path');
const redis = require('../redisClient.js');

const message = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const defaultSettings = { prefix: '!sb' };
  const guildSettings = (await redis.hgetall(message.guild.id)) || {};
  const settings = { ...defaultSettings, ...guildSettings };

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${settings.prefix}\``);
  }

  if (!message.content.startsWith(settings.prefix)) return;

  const args = message.content.trim().slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  message.args = args;

  if (client.commands[command]) {
    client.commands[command](client, message);
  } else {
    message.channel.send(`\`Command not found. Please run ${settings.prefix}${settings.prefix.length > 1 ? ' ' : ''}help for a list of all commands\``);
  }
};

module.exports = message;
