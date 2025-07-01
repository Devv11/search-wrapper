const express = require('express');
const { performSearch } = require('../controllers/searchController');

const router = express.Router();

// Fix: This will handle POST /api/search when mounted at /api
router.post('/search', performSearch);

module.exports = router;