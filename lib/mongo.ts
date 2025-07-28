import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Define MONGODB_URI en .env.local");
}

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
