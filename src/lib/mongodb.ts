import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const mongooseCache: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = mongooseCache;
}

async function connectToDatabase(): Promise<typeof mongoose> {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("Please define the MONGO_URL environment variable inside .env");
  }

  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongooseCache.promise = mongoose.connect(MONGO_URL, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    mongooseCache.conn = await mongooseCache.promise;
  } catch (error) {
    mongooseCache.promise = null;
    throw error;
  }

  return mongooseCache.conn;
}

export { connectToDatabase };

