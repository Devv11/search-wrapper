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



//api req structure

// const { getJson } = require("serpapi");

// getJson({
//   engine: "google",
//   q: "Fresh Bagels",
//   location: "Seattle-Tacoma, WA, Washington, United States",
//   hl: "en",
//   gl: "us",
//   google_domain: "google.com",
//   num: "10",
//   start: "10",
//   safe: "active",
//   api_key: "4b17fe16c94bb86647506d6d42c25b3e0712daf893eb1897801c50a3f2792e86"
// }, (json) => {
//   console.log(json["organic_results"]);
// });

//https://serpapi.com/search.json?engine=google&q=Fresh+Bagels&location=Seattle-Tacoma,+WA,+Washington,+United+States&hl=en&gl=us&google_domain=google.com&num=10&start=10&safe=active