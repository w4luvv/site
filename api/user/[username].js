import clientPromise from '../mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    query: { username },
  } = req;
  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 