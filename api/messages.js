import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('forum');
  const messages = db.collection('messages');
  const users = db.collection('users');

  if (req.method === 'GET') {
    const allUsers = await users.find().toArray();
    const userMap = Object.fromEntries(allUsers.map(u => [u.username, u]));
    let msgs = await messages.find().toArray();
    msgs = msgs.map(m => ({
      ...m,
      banned: userMap[m.author]?.banned || false
    }));
    res.json(msgs);
  } else if (req.method === 'POST') {
    const { body, author } = req.body;
    if (!body || !author) return res.status(400).json({ error: 'Missing fields' });
    const msg = {
      id: Date.now(),
      body,
      author,
      createdAt: new Date().toISOString()
    };
    await messages.insertOne(msg);
    res.json(msg);
  } else if (req.method === 'DELETE') {
    await messages.deleteMany({});
    res.json({ success: true });
  } else {
    res.status(405).end();
  }
} 