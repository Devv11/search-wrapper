const Search = require('../models/Search');
const SearchService = require('../services/googleSearch');
const { getJson } = require("serpapi");
require ('dotenv').config()

exports.performSearch = async (req, res) => {
  try {
    const { query} = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log(`Received query from frontend: "${query}"`);

    const startTime = Date.now();
    const searchResults = await SearchService.search(query);
    const searchTime = Date.now() - startTime;

    //console.log(`SerpApi URL (conceptual) for query "${query}": https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&location=Seattle-Tacoma,+WA,+Washington,+United+States&hl=en&gl=us&google_domain=google.com&num=${num}&start=${start}&safe=active`);

    console.log(searchResults)
    // Format results
    // const formattedResults = searchResults.items.map(item => ({
    //   title: item.title,
    //   link: item.link,
    //   snippet: item.snippet,
    //   displayLink: item.displayLink
    // }));

    // // Save to database
    // const searchRecord = new Search({
    //   query,
    //   results: formattedResults,
    //   resultCount: searchResults.searchInformation?.totalResults || 0,
    //   searchTime
    // });

    // await searchRecord.save();

    // res.json({
    //   success: true,
    //   data: {
    //     results: formattedResults,
    //     searchInformation: searchResults.searchInformation,
    //     queries: searchResults.queries,
    //     searchTime
    //   }
    // });

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
//   api_key: process.env.SERP_API_KEY
// }, (json) => {
//   console.log(json["organic_results"]);
// });

//https://serpapi.com/search.json?engine=google&q=Fresh+Bagels&location=Seattle-Tacoma,+WA,+Washington,+United+States&hl=en&gl=us&google_domain=google.com&num=10&start=10&safe=active