const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.get = promisify(redisClient.get);
redisClient.set = promisify(redisClient.set);

module.exports = redisClient;
