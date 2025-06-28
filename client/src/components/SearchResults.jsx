import React from 'react';

const SearchResults = ({ results, searchInfo, loading, error }) => {
  if (loading) {
    return <div className="loading">Searching...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      {searchInfo && (
        <div className="search-info">
          About {searchInfo.formattedTotalResults} results ({searchInfo.formattedSearchTime} seconds)
        </div>
      )}
      
      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <div className="result-url">{result.displayLink}</div>
            <h3 className="result-title">
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            <p className="result-snippet">{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;