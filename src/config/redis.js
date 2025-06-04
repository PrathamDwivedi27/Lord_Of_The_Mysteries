import Redis from 'ioredis';
import logger from '../utils/logger.js';
import { REDIS_HOST, REDIS_PORT } from './server-config.js';

const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

redisClient.on('connect', () => logger.info('Connected to Redis'));
redisClient.on('error', (err) => logger.error('Redis Error:', err));

export default redisClient;
