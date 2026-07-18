const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get logged in user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a real order (Checkout)
router.post('/checkout', auth, async (req, res) => {
  try {
    const { cartItems, address } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    // Calculate total amount from frontend (or ideally backend, but we trust frontend for now since it's a demo)
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    // Create the order with nested items
    const newOrder = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'PAID', // Simulating successful payment
        address: address || 'No address provided',
        items: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Cancel an order
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    if (order.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      return res.status(400).json({ msg: 'Cannot cancel an order that has been shipped or delivered' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'CANCELLED' }
    });

    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
