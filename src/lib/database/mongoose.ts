import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'test', bufferCommands: false 
    })

    try {
      cached.conn = await cached.promise;
      console.log('Successfully connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
      throw error;
    }

  cached.conn = await cached.promise;

  return cached.conn;
}