const express = require('express');
const { performSearch } = require('../controllers/searchController');

const router = express.Router();

router.post('/search', performSearch);

module.exports = router;