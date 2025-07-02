import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, reason, duration } = req.body;
  if (!username) return res.status(400).json({ error: 'Missing username' });
  await client.connect();
  const db = client.db('forum');
  const users = db.collection('users');
  const user = await users.findOne({ username });
  if (!user) return res.status(404).json({ error: 'User not found' });
  let banExpiresAt = null;
  if (duration) {
    let ms = 0;
    if (typeof duration === 'string') {
      if (duration.endsWith('m')) ms = parseInt(duration) * 60 * 1000;
      else if (duration.endsWith('h')) ms = parseInt(duration) * 60 * 60 * 1000;
      else if (duration.endsWith('d')) ms = parseInt(duration) * 24 * 60 * 60 * 1000;
      else ms = parseInt(duration) * 60 * 1000;
    } else if (typeof duration === 'number') {
      ms = duration * 60 * 1000;
    }
    banExpiresAt = Date.now() + ms;
  }
  await users.updateOne(
    { username },
    { $set: { banned: true, banReason: reason || '', banExpiresAt } }
  );
  res.json({ success: true });
} 