import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('forum');
  const users = await db.collection('users').find().toArray();
  res.json(users);
} 