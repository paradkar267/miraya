const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let where = {};
    if (category && category !== 'all') {
      where.category = category;
    }
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive' // Requires Prisma PostgreSQL provider
      };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { id: 'asc' }
    });
    
    // Map them back to the format the frontend expects temporarily, or directly use Prisma fields.
    // Frontend expects: { id, category, image, title (name), price, priceValue, color, fabric, description }
    const formattedProducts = products.map(p => ({
      ...p,
      title: p.name // Map name back to title for easy transition
    }));

    res.json(formattedProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json({
      ...product,
      title: product.name
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
