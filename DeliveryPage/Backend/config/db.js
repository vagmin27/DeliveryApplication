import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for DeliveryPage');
    } catch (error) {
        console.error('MongoDB connection failed', error.message);
        process.exit(1);
    }
};

export default connectDB;
