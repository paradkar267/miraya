const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get logged in user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });
    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add to wishlist
router.post('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if already in wishlist
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: Number(productId)
        }
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const item = await prisma.wishlist.create({
      data: {
        userId: req.user.id,
        productId: Number(productId)
      },
      include: { product: true }
    });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a demo item to wishlist
router.post('/demo', auth, async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    if (products.length === 0) {
      return res.status(400).json({ message: 'No products in database' });
    }
    
    // Pick a random product
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: randomProduct.id
        }
      }
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const item = await prisma.wishlist.create({
      data: {
        userId: req.user.id,
        productId: randomProduct.id
      },
      include: { product: true }
    });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Remove from wishlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await prisma.wishlist.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prisma.wishlist.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
