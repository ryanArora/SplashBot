class Prefix {
  constructor(client) {
    this.client = client;
  }

  async run(message, args) {
    let subcmd = 'get';
    let prefix = this.client.settings.defaultPrefix;

    if (args[0]) subcmd = args[0].toLowerCase();
    if (args[1]) prefix = args[1];

    if (subcmd === 'set') {
      const result = await this.client.redis.set(message.channel.guild.id, prefix);
      if (result) {
        message.channel.send(`Prefix successfuly changed to: \`${args[1]}\``);
      } else {
        message.channel.send('Internal server error. Please try again and contact the owner if this error persists');
      }
    } else {
      const prefix = await this.client.redis.get(message.channel.guild.id);
      if (!prefix) prefix = this.client.settings.defaultPrefix;
      message.channel.send(`This server\'s prefix is currently: "${prefix}"`);
    }
  }
}

module.exports = Prefix;
