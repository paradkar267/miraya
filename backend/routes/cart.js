const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get logged in user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add item to cart
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, size = 'Custom' } = req.body;
    
    // Check if already in cart
    const existing = await prisma.cartItem.findUnique({
      where: {
        userId_productId_size: {
          userId: req.user.id,
          productId: Number(productId),
          size: size
        }
      }
    });

    if (existing) {
      // Just update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true }
      });
      return res.json(updatedItem);
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId: req.user.id,
        productId: Number(productId),
        quantity: quantity,
        size: size
      },
      include: { product: true }
    });

    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Remove item from cart
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await prisma.cartItem.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prisma.cartItem.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Clear cart (useful for checkout)
router.delete('/', auth, async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
