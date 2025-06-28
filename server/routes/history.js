const express = require('express');
const { 
  getSearchHistory, 
  deleteSearchHistory, 
  clearAllHistory 
} = require('../controllers/historyController');

const router = express.Router();

router.get('/history', getSearchHistory);
router.delete('/history/:id', deleteSearchHistory);
router.delete('/history', clearAllHistory);

module.exports = router;