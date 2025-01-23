const mockSession = {
  user: {
    name: "Test User",
    email: "test@example.com",
  },
};

const useSession = jest.fn(() => {
  return { data: mockSession, status: "authenticated" };
});

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri() ?? "mongodb+srv://monitechdev:mdmeQ9ZbthyPmcWa@cluster0.or3wq.mongodb.net/"
  ;
  console.log("uri", uri);
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export { useSession, connect, closeDatabase as close, clear };