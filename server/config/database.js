const mongoose = require('mongoose');

const mongo_URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect();
    console.log(`MongoDB Connected: ${mongo_URL}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;