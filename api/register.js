import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ error: 'Missing fields' });
  await client.connect();
  const db = client.db('forum');
  const users = db.collection('users');
  const existing = await users.findOne({ username });
  if (existing) return res.status(400).json({ error: 'Username taken' });
  const lastUser = await users.find().sort({ uid: -1 }).limit(1).toArray();
  const uid = lastUser.length ? lastUser[0].uid + 1 : 1;
  await users.insertOne({
    username,
    password,
    gmail: email,
    uid,
    joinDate: new Date().toISOString(),
    banned: false,
    banReason: '',
    banExpiresAt: null
  });
  res.json({ success: true, uid });
} 