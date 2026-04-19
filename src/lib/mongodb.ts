import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached: { client: MongoClient; db: Db } | null = null;

export async function getDb(): Promise<Db> {
  if (cached) return cached.db;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cached = { client, db: client.db("btscomm") };
  return cached.db;
}
