const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/notifications - Get all notifications for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    let notification = await prisma.notification.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!notification) return res.status(404).json({ msg: 'Notification not found' });
    if (notification.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    notification = await prisma.notification.update({
      where: { id: parseInt(req.params.id) },
      data: { isRead: true }
    });
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
