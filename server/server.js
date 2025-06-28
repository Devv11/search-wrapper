const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const searchRoutes = require('./routes/search');
const historyRoutes = require('./routes/history');

const app = express();

// Connect to database
connectDB();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', searchRoutes);
app.use('/api', historyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: ""
  });
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});