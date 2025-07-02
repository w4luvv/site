import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('forum');
  const threads = 0; // You can implement threads if you want
  const messages = await db.collection('messages').countDocuments();
  const users = await db.collection('users').find().toArray();
  const members = users.length;
  const latestMember = members ? users[users.length - 1].username : '-';
  res.json({ threads, messages, members, latestMember });
} 