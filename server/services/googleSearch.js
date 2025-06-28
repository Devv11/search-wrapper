const axios = require('axios');
require('dotenv').config();

class GoogleSearchService {
  constructor() {
    this.apiKey = process.env.GOOGLE_SEARCH_KEY;
    this.cx = process.env.GOOGLE_CX;
    this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
  }

  async search(query, start = 1, num = 10) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          key: this.apiKey,
          cx: this.cx,
          q: query,
          start,
          num
        }
      });

      return {
        items: response.data.items || [],
        searchInformation: response.data.searchInformation,
        queries: response.data.queries
      };
    } catch (error) {
      throw new Error(`Google Search API Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

module.exports = new GoogleSearchService();