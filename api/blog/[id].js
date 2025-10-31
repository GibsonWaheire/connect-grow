// Individual blog post API
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // In production: const post = await db.collection('posts').findOne({ _id: id });
      const post = null; // Placeholder
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
      res.json({ success: true, post });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, content, excerpt, imageUrl, tags } = req.body;
      // In production: const post = await db.collection('posts').findOneAndUpdate({ _id: id }, { $set: { title, content, excerpt, imageUrl, tags, updatedAt: new Date() } }, { returnDocument: 'after' });
      res.json({ success: true, message: 'Post updated' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      // In production: await db.collection('posts').deleteOne({ _id: id });
      res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

