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

// Create a demo order
router.post('/demo', auth, async (req, res) => {
  try {
    // Generate a random amount between 5000 and 25000
    const totalAmount = Math.floor(Math.random() * 20000) + 5000;
    
    // Random status
    const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const newOrder = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        status,
      },
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
