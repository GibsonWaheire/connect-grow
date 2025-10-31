// Shop Products API
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // In production, use a real database
  if (req.method === 'GET') {
    try {
      // Get all products
      // In production: const products = await db.collection('products').find().toArray();
      const products = []; // Placeholder - implement with your database
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, imageUrl, category, inStock } = req.body;
      if (!name || !price) {
        return res.status(400).json({ success: false, error: 'Name and price are required' });
      }
      // In production: const product = await db.collection('products').insertOne({ name, description, price, imageUrl, category, inStock, createdAt: new Date() });
      const product = { id: Date.now().toString(), name, description, price, imageUrl, category, inStock, createdAt: new Date() };
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

