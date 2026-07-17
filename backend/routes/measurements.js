const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all profiles for user
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await prisma.measurementProfile.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a profile
router.post('/', auth, async (req, res) => {
  try {
    const { title, isDefault, fullName, height, bust, waist, hips, shoulder, armLength, neck } = req.body;
    
    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.measurementProfile.updateMany({
        where: { userId: req.user.id, isDefault: true },
        data: { isDefault: false }
      });
    }

    const profile = await prisma.measurementProfile.create({
      data: {
        userId: req.user.id,
        title, isDefault, fullName, height, bust, waist, hips, shoulder, armLength, neck
      }
    });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, isDefault, fullName, height, bust, waist, hips, shoulder, armLength, neck } = req.body;
    
    // Check ownership
    const existing = await prisma.measurementProfile.findUnique({ where: { id: Number(req.params.id) }});
    if (!existing || existing.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (isDefault) {
      await prisma.measurementProfile.updateMany({
        where: { userId: req.user.id, isDefault: true },
        data: { isDefault: false }
      });
    }

    const updated = await prisma.measurementProfile.update({
      where: { id: Number(req.params.id) },
      data: { title, isDefault, fullName, height, bust, waist, hips, shoulder, armLength, neck }
    });

    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a profile
router.delete('/:id', auth, async (req, res) => {
  try {
    const existing = await prisma.measurementProfile.findUnique({ where: { id: Number(req.params.id) }});
    if (!existing || existing.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prisma.measurementProfile.delete({ where: { id: Number(req.params.id) }});
    res.json({ message: 'Profile removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
