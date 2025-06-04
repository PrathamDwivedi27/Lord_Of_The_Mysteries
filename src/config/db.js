import mongoose from 'mongoose';
import { MONGODB_URI } from './server-config.js';
import logger from '../utils/logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('DB connected successfully');

  } catch (error) {
    logger.error('Something went wrong in connecting to DB', error);
  }
};