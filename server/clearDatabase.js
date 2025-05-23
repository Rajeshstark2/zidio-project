const mongoose = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'your-your-mongodb-url', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Delete all users
    await User.deleteMany({});
    console.log('All users deleted');
    
    // Delete all blogs
    await Blog.deleteMany({});
    console.log('All blogs deleted');
    
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 