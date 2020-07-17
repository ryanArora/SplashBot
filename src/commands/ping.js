class Ping {
  constructor(client) {
    this.client = client;
  }

  async run(message, args) {
    const ping = Date.now() - message.createdTimestamp;
    message.channel.send('Pong, the bot has `' + ping + 'ms` of ping to this discord server');
  }
}

module.exports = Ping;
