import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  // password, db, etc. if needed
});

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis Error:', err));

export default redisClient;
