const serpapi = require('serpapi');
require('dotenv').config();

// Helper function to wrap getJson in a Promise, ensuring consistent async/await usage.
// This is beneficial for robust error handling and clearer flow control.
const getSerpJsonPromise = (params) => {
    return new Promise((resolve, reject) => {
        serpapi.getJson(params, (json) => {
            // SerpApi often includes an 'error' field if something went wrong
            if (json.error) {
                reject(new Error(json.error));
            } else {
                resolve(json);
            }
        });
    });
};

async function search(query) {
    const apiKey = process.env.SERP_API_KEY;

    if (!apiKey) {
        throw new Error("SERP_API_KEY is not defined in environment variables.");
    }
const start = 1, num = 100

    const params = {
        engine: "google",
        q: query,
        api_key: apiKey,
        num: num, // Pass num from parameters
        start: start, // Pass start from parameters
        // Add other parameters if needed, e.g., location, hl, gl
        // location: "Austin, Texas",
        // hl: "en",
        // gl: "us",
        // google_domain: "google.com",
        // safe: "active",
    };

    try {
        // Use the await keyword with our Promise-wrapped getJson
        const response = await getSerpJsonPromise(params);

        // SerpApi response structure:
        // organic_results, search_information, search_parameters, etc.
        return {
            organic_results: response.organic_results || [],
            search_information: response.search_information,
            search_parameters: response.search_parameters
        };

    } catch (error) {
        console.error('Error calling SerpApi:', error.message);
        throw new Error(`SerpApi call failed: ${error.message}`);
    }
}

module.exports = {
    search // Export the search function
};