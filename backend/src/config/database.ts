import mongoose from 'mongoose';
import envConfig from './env';

const connectDB = async () => {
  try {
     const mongoUri=envConfig.Mongo_URL as string
    await mongoose.connect(mongoUri)
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
