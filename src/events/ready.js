class Ready {
  constructor(client) {
    this.client = client;
  }

  async run() {
    console.log(`${this.client.user.tag} is serving ${this.client.users.cache.size} users in ${this.client.guilds.cache.size} servers.`);
  }
}

module.exports = Ready;
