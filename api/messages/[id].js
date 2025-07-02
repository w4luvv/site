import clientPromise from '../mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    query: { id },
  } = req;
  try {
    const client = await clientPromise;
    const db = client.db();
    const message = await db.collection('messages').findOne({ _id: id });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 