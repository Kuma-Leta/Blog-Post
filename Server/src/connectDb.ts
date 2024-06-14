import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const connectionString = process.env.CONNECTION_STRING;

    if (!connectionString) {
      throw new Error('MongoDB connection string is not defined in environment variables');
    }

    await mongoose.connect(connectionString);

    console.log('DB connected successfully');
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

