import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import config from "@/lib/config";

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient> | undefined;
    }
  }
}

if (!config.DATABASE_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(config.DATABASE_URL);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so the client is not recreated on every hot reload
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  clientPromise = client.connect();
}

export default clientPromise;

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(String(config.DATABASE_URL));
    return conn;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
  }
}