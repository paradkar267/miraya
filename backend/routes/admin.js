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
          select: { 
            firstName: true, 
            lastName: true, 
            email: true,
            measurements: true 
          }
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

// PUT /api/admin/orders/:id/status - Update order status (Approve/Cancel)
router.put('/orders/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['APPROVED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status }
    });

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId: order.userId,
        title: `Order ${status.toLowerCase()}`,
        message: `Your order #MRY-${order.id} has been ${status.toLowerCase()}.`
      }
    });

    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/admin/bestsellers - Get top selling products
router.get('/bestsellers', auth, isAdmin, async (req, res) => {
  try {
    const bestsellers = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5
    });

    const productIds = bestsellers.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

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

// GET /api/admin/products - Get all products (admin view)
router.get('/products', auth, isAdmin, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' }
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/admin/products - Add a new product
router.post('/products', auth, isAdmin, async (req, res) => {
  try {
    const { name, category, price, priceValue, color, fabric, image, description } = req.body;
    
    if (!name || !category || !price || !priceValue || !image) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        price,
        priceValue: parseInt(priceValue),
        color,
        fabric,
        image,
        description
      }
    });

    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/admin/products/:id - Edit a product
router.put('/products/:id', auth, isAdmin, async (req, res) => {
  try {
    const { name, category, price, priceValue, color, fabric, image, description } = req.body;
    
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        category,
        price,
        priceValue: parseInt(priceValue),
        color,
        fabric,
        image,
        description
      }
    });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.code === 'P2025') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE /api/admin/products/:id - Delete a product
router.delete('/products/:id', auth, isAdmin, async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.code === 'P2025') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
