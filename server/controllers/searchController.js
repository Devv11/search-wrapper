const Search = require('../models/Search');
const SearchService = require('../services/googleSearch');

async function performSearch(req, res) {
  try {
    const { query, page = 1 } = req.body; // Fix: Remove await for req.body
    
    if (!query) {
      return res.status(400).json({ 
        success: false,
        error: 'Search query is required' 
      });
    }

    console.log(`Received query from frontend: "${query}", page: ${page}`);

    const startTime = Date.now();
    
    // Calculate start parameter for pagination (Google uses 0-based indexing)
    const start = (page - 1) * 10 + 1;
    

    const searchResults = await SearchService.search(query, start, 10);
    const endTime = Date.now();
    
    console.log(`Search completed in ${endTime - startTime}ms`);

    return res.status(200).json({
      success: true,
      data: {
        results: searchResults.organic_results,
        searchInformation: searchResults.search_information,
        searchParameters: searchResults.search_parameters,
        query,
        page,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Search failed',
      message: error.message 
    });
  }
}

module.exports = { performSearch };