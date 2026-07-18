const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
const passport = require('passport');

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  console.log("=== GOOGLE CALLBACK ===");
  console.log("Code received:", code ? code.substring(0, 20) + "..." : "MISSING");
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  if (!code) {
    return res.redirect(`${frontendUrl}/auth?error=no_code`);
  }

  try {
    // Manual token exchange - bypassing passport to debug
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: `${backendUrl}/api/auth/google/callback`,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
    });

    console.log("Sending to Google token endpoint...");
    console.log("client_id:", process.env.GOOGLE_CLIENT_ID);
    
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const tokenData = await tokenRes.json();
    console.log("=== GOOGLE TOKEN RESPONSE ===");
    console.log(JSON.stringify(tokenData, null, 2));

    if (tokenData.error) {
      return res.redirect(`${frontendUrl}/auth?error=${tokenData.error_description || tokenData.error}`);
    }

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const googleUser = await userRes.json();
    console.log("=== GOOGLE USER ===", googleUser.email);

    // Find or create user in DB
    let user = await prisma.user.findUnique({ where: { googleId: googleUser.id } });
    if (!user) {
      user = await prisma.user.findUnique({ where: { email: googleUser.email } });
      if (user) {
        user = await prisma.user.update({ where: { email: googleUser.email }, data: { googleId: googleUser.id } });
      } else {
        user = await prisma.user.create({
          data: {
            firstName: googleUser.given_name || 'Google',
            lastName: googleUser.family_name || 'User',
            email: googleUser.email,
            googleId: googleUser.id,
            profilePhoto: googleUser.picture || null,
          }
        });
      }
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const userParam = encodeURIComponent(JSON.stringify({
      id: user.id, firstName: user.firstName, lastName: user.lastName,
      email: user.email, profilePhoto: null
    }));
    console.log("=== REDIRECTING TO FRONTEND ===");
    res.redirect(`${frontendUrl}/auth?token=${token}&user=${userParam}`);

  } catch (err) {
    console.error("=== OAUTH ERROR ===", err);
    res.redirect(`${frontendUrl}/auth?error=server_error`);
  }
});

// OLD passport route (commented out for debug)
/*
router.get('/google/callback-passport', (req, res, next) => {
  next();

  // Successful authentication
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const userParam = encodeURIComponent(JSON.stringify({
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    profilePhoto: req.user.profilePhoto
  }));
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/auth?token=${token}&user=${userParam}`);
});
*/
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
      select: { id: true, firstName: true, lastName: true, email: true, profilePhoto: true, address: true }
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
    const { firstName, lastName, profilePhoto, address } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        profilePhoto,
        address
      }
    });

    res.json({
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      profilePhoto: updatedUser.profilePhoto,
      address: updatedUser.address
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
