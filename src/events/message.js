class Message {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;
    if (message.content.indexOf(this.client.prefix) !== 0) return;

    const args = message.content.slice(this.client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  }
}

module.exports = Message;
