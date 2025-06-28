import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;