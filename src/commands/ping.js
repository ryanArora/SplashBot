const ping = (client, message) => {
  const ping = Date.now() - message.createdTimestamp;
  message.channel.send('Pong, the bot has `' + ping + 'ms` of ping to this discord server');
};

module.exports = ping;
