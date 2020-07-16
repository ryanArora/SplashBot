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
  }
}

module.exports = Message;
