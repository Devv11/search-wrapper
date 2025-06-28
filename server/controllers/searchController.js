const Search = require('../models/Search');
const googleSearchService = require('../services/googleSearch');

exports.performSearch = async (req, res) => {
  try {
    const { query, start = 1, num = 10 } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const startTime = Date.now();
    const searchResults = await googleSearchService.search(query, start, num);
    const searchTime = Date.now() - startTime;

    // Format results
    const formattedResults = searchResults.items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink
    }));

    // Save to database
    const searchRecord = new Search({
      query,
      results: formattedResults,
      resultCount: searchResults.searchInformation?.totalResults || 0,
      searchTime
    });

    await searchRecord.save();

    res.json({
      success: true,
      data: {
        results: formattedResults,
        searchInformation: searchResults.searchInformation,
        queries: searchResults.queries,
        searchTime
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
};