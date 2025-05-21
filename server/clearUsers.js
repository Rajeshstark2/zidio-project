require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

async function clearUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error clearing users:', error);
  }
}

clearUsers(); 