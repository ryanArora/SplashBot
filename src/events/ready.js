const ready = (client) => {
  console.log(`${client.user.tag} is serving ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
  client.user.setActivity(`prefix "${client.settings.prefix}"`, { type: 'LISTENING' });
};

module.exports = ready;
