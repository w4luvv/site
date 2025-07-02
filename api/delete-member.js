import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Missing username' });
  await client.connect();
  const db = client.db('forum');
  const users = db.collection('users');
  const posts = db.collection('profile_posts');
  const messages = db.collection('messages');
  await users.deleteOne({ username });
  await posts.deleteMany({ $or: [{ profile: username }, { author: username }] });
  await messages.deleteMany({ author: username });
  res.json({ success: true });
} 