// Individual Product API
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
      // In production: const product = await db.collection('products').findOne({ _id: id });
      const product = null; // Placeholder
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, description, price, imageUrl, category, inStock } = req.body;
      // In production: const product = await db.collection('products').findOneAndUpdate({ _id: id }, { $set: { name, description, price, imageUrl, category, inStock, updatedAt: new Date() } }, { returnDocument: 'after' });
      res.json({ success: true, message: 'Product updated' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      // In production: await db.collection('products').deleteOne({ _id: id });
      res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

