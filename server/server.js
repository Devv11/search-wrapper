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
app.get('/', (req, res) => {
  return res.send("Search Wrapper");
});


app.use('/api', searchRoutes); 
app.use('/api/history', historyRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});