const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Harshavardhan:Harsha%4012%23@cluster0.axim5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    try {
      // Drop the users collection
      await mongoose.connection.collection('users').drop();
      console.log('✅ Dropped users collection');
      
      // Recreate the collection with the correct schema
      const User = require('./models/User');
      await User.createIndexes();
      console.log('✅ Recreated users collection with correct schema');
    } catch (error) {
      if (error.code === 26) {
        console.log('Collection does not exist, creating new one...');
        const User = require('./models/User');
        await User.createIndexes();
        console.log('✅ Created users collection with correct schema');
      } else {
        console.error('❌ Error:', error);
      }
    } finally {
      // Close the connection
      await mongoose.connection.close();
      console.log('✅ Database connection closed');
    }
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  }); 