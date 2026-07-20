const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
const passport = require('passport');

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`
);

// Google OAuth login route
router.get('/google', (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    prompt: 'consent'
  });
  res.redirect(url);
});

const usedCodes = new Set();

router.get('/google/callback', async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const code = req.query.code;
  
  if (!code) {
    return res.redirect(`${frontendUrl}/auth?error=no_code_provided`);
  }

  if (usedCodes.has(code)) {
    console.log("Duplicate request for code ignored.");
    return; // Don't redirect, just ignore to not override the first successful response
  }
  usedCodes.add(code);
  setTimeout(() => usedCodes.delete(code), 1000 * 60 * 5); // Clean up after 5 mins

  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);
    
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Find or create user
    let user = await prisma.user.findUnique({ where: { googleId: payload.sub } });
    if (!user) {
      user = await prisma.user.findUnique({ where: { email: payload.email } });
      if (user) {
        user = await prisma.user.update({
          where: { email: payload.email },
          data: { googleId: payload.sub, profilePhoto: user.profilePhoto || payload.picture }
        });
      } else {
        user = await prisma.user.create({
          data: {
            firstName: payload.given_name || 'Google',
            lastName: payload.family_name || 'User',
            email: payload.email,
            googleId: payload.sub,
            profilePhoto: payload.picture || null,
          }
        });
      }
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const userParam = encodeURIComponent(JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }));
    
    res.redirect(`${frontendUrl}/auth?token=${token}&user=${userParam}`);
  } catch (err) {
    console.error("=== OAUTH ERROR ===", err.message);
    if (err.response && err.response.data) {
      console.error("=== OAUTH ERROR DETAILS ===", err.response.data);
    }
    const errorDetails = err.response?.data?.error_description || err.message;
    res.redirect(`${frontendUrl}/auth?error=${encodeURIComponent(errorDetails)}`);
  }
});
// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Generate token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
        address: newUser.address,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePhoto: user.profilePhoto,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Profile (fresh from DB)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, firstName: true, lastName: true, email: true, profilePhoto: true, address: true, eventDate: true }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, profilePhoto, address, eventDate } = req.body;
    
    let updateData = {
      firstName,
      lastName,
      profilePhoto,
      address,
    };
    if (eventDate !== undefined) {
      updateData.eventDate = eventDate ? new Date(eventDate) : null;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData
    });

    res.json({
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      profilePhoto: updatedUser.profilePhoto,
      address: updatedUser.address,
      eventDate: updatedUser.eventDate
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// Delete Account
router.delete('/account', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete related records first due to foreign key constraints
    await prisma.cartItem.deleteMany({ where: { userId } });
    await prisma.wishlist.deleteMany({ where: { userId } });
    await prisma.order.deleteMany({ where: { userId } });
    await prisma.measurementProfile.deleteMany({ where: { userId } });

    // Finally delete the user
    await prisma.user.delete({ where: { id: userId } });

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting account' });
  }
});

module.exports = router;
