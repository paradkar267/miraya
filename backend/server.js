const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const passport = require('./passport');
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/measurements', require('./routes/measurements'));
app.use('/api/products', require('./routes/products'));
// app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
  res.send('Miraya Backend API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});