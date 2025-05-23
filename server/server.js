// Load environment variables from .env - this must be first
require('dotenv').config();

// Set default values for environment variables (dummy values for development)
process.env.PORT = process.env.PORT || '8080';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zidio_dummy';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'dummy_jwt_secret';

// Warn if using dummy values
if (process.env.MONGODB_URI === 'mongodb://localhost:27017/zidio_dummy') {
  console.warn('⚠️  Using dummy MongoDB URI. Please set MONGODB_URI for production.');
}
if (process.env.JWT_SECRET === 'dummy_jwt_secret') {
  console.warn('⚠️  Using dummy JWT secret. Please set JWT_SECRET for production.');
}

// MongoDB Connection String Format:
// mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
// Example: mongodb+srv://myuser:mypassword@cluster0.mongodb.net/zidio?retryWrites=true&w=majority
const MONGODB_URI = process.env.MONGODB_URI;
process.env.JWT_SECRET = process.env.JWT_SECRET;

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
mongoose.connect(MONGODB_URI,{
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
