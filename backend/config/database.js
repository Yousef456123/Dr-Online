import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/dr-online';

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
    console.error('❌ MongoDB Connection Failed');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    if (error.code) {
      console.error('Error code:', error.code);
    }

    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }

    console.error(
      '❌ Check that MONGODB_URI is correct and MongoDB is reachable'
    );

    process.exit(1);
  }
};

export default connectDB;
