import Redis from 'ioredis';
import logger from '../utils/logger.js';

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  // password, db, etc. if needed
});

redisClient.on('connect', () => logger.info('Connected to Redis'));
redisClient.on('error', (err) => logger.error('Redis Error:', err));

export default redisClient;
