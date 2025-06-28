const Search = require('../models/Search');

exports.getSearchHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const searches = await Search.find()
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('query timestamp resultCount searchTime');

    const total = await Search.countDocuments();

    res.json({
      success: true,
      data: {
        searches,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch search history',
      message: error.message 
    });
  }
};

exports.deleteSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Search.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Search history deleted successfully'
    });

  } catch (error) {
    console.error('History delete error:', error);
    res.status(500).json({ 
      error: 'Failed to delete search history',
      message: error.message 
    });
  }
};

exports.clearAllHistory = async (req, res) => {
  try {
    await Search.deleteMany({});
    
    res.json({
      success: true,
      message: 'All search history cleared successfully'
    });

  } catch (error) {
    console.error('History clear error:', error);
    res.status(500).json({ 
      error: 'Failed to clear search history',
      message: error.message 
    });
  }
};