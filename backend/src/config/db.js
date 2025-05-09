const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Removed deprecated options useNewUrlParser and useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
