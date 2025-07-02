import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await client.connect();
  const db = client.db('forum');
  await db.collection('users').deleteMany({});
  res.json({ success: true });
} 