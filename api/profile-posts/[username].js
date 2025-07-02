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
    const posts = await db.collection('profile_posts').find({ username }).toArray();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 