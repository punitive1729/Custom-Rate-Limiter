// Setup a Redis Client Connection

const redis = require('redis');
const client = redis.createClient();

client.on('connect', function () {
  console.log('Redis Database connected' + '\n');
});

client.on('reconnecting', function () {
  console.log('Redis client reconnecting');
});

client.on('ready', function () {
  console.log('Redis client is ready');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

client.on('end', function () {
  console.log('\nRedis client disconnected');
  console.log('Server is going down now...');
  process.exit();
});

client.connect();

module.exports = client;
