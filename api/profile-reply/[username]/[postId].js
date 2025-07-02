import clientPromise from '../../mongodb';

export default async function handler(req, res) {
  const {
    query: { username, postId },
    method,
    body,
  } = req;
  try {
    const client = await clientPromise;
    const db = client.db();
    if (method === 'GET') {
      const post = await db.collection('profile_posts').findOne({ _id: postId, username });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post.replies || []);
    } else if (method === 'POST') {
      const { reply } = body;
      if (!reply) {
        return res.status(400).json({ error: 'Reply content required' });
      }
      const result = await db.collection('profile_posts').updateOne(
        { _id: postId, username },
        { $push: { replies: reply } }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 