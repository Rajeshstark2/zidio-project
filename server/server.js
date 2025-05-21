// Load environment variables from .env - this must be first
require('dotenv').config();

// Set default values for environment variables
process.env.PORT = process.env.PORT || '8000';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb-url';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-2025-zidio-project';

// Debug: Log environment variables
console.log('Environment Variables:', {
  PORT: process.env.PORT,
  MONGODB_URI: 'MongoDB URI is set',
  JWT_SECRET: 'JWT Secret is set'
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Use the PORT from environment variables
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
