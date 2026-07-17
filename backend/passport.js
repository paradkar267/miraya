const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user already exists with this googleId
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id }
      });

      if (user) {
        return done(null, user);
      }

      // 2. Check if user exists with this email
      const email = profile.emails[0].value;
      user = await prisma.user.findUnique({
        where: { email }
      });

      if (user) {
        // Link googleId to existing account
        user = await prisma.user.update({
          where: { email },
          data: { googleId: profile.id, profilePhoto: user.profilePhoto || profile.photos[0].value }
        });
        return done(null, user);
      }

      // 3. If not, create a new user
      const newUser = await prisma.user.create({
        data: {
          firstName: profile.name.givenName || 'Google',
          lastName: profile.name.familyName || 'User',
          email: email,
          googleId: profile.id,
          profilePhoto: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null
        }
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;
