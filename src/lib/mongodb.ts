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
  // Hardcoded MongoDB connection URL
  const MONGO_URL = "mongodb+srv://supermanvitc_db_user:dqgcDwGJ58zIQS0s@cluster.9ivtnhd.mongodb.net/?appName=Cluster";

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

