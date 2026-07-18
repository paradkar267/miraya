const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Admin Middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || (user.email !== 'bizleap1@gmail.com' && user.role !== 'ADMIN')) {
      return res.status(403).json({ msg: 'Access denied. Admin only.' });
    }
    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// GET /api/admin/dashboard - Get overall stats
router.get('/dashboard', auth, isAdmin, async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const orders = await prisma.order.findMany();
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/admin/orders - Get all orders with details
router.get('/orders', auth, isAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true }
        },
        items: {
          include: {
            product: { select: { name: true, image: true } }
          }
        }
      }
    });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/admin/bestsellers - Get top selling products
router.get('/bestsellers', auth, isAdmin, async (req, res) => {
  try {
    // Group by productId to find the most sold items
    const bestsellers = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    });

    // Fetch product details for these top products
    const productIds = bestsellers.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    // Merge sales count into product objects
    const result = products.map(product => {
      const salesData = bestsellers.find(b => b.productId === product.id);
      return {
        ...product,
        totalSold: salesData._sum.quantity
      };
    }).sort((a, b) => b.totalSold - a.totalSold);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
