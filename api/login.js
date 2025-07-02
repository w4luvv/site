import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;
  await client.connect();
  const db = client.db('forum');
  const users = db.collection('users');
  const user = await users.findOne({ username, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  if (user.banned) {
    if (user.banExpiresAt && Date.now() > user.banExpiresAt) {
      await users.updateOne({ username }, { $set: { banned: false, banExpiresAt: null } });
    } else {
      return res.status(403).json({ error: 'You Were Banned By An Admin', reason: user.banReason || '', expires: user.banExpiresAt });
    }
  }
  res.json({ success: true });
} 