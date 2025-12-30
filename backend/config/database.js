import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dr-online';
    
    // Log connection attempt (without password)
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  WARNING: MONGODB_URI not found in environment variables!');
      console.warn('⚠️  Using default localhost connection (will fail in production)');
    } else {
      const uriWithoutPassword = mongoUri.replace(/:[^:@]+@/, ':****@');
      console.log(`🔌 Connecting to MongoDB: ${uriWithoutPassword}`);
    }
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`❌ Make sure MONGODB_URI environment variable is set correctly`);
    process.exit(1);
  }
};

export default connectDB;
