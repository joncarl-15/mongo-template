import mongoose from 'mongoose';
import dns from 'dns';
import logger from '../utils/logger';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
    if (process.platform === 'win32') {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    }
    try {
        const conn = await mongoose.connect(env.MONGO_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
