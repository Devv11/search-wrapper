import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInputComponent({ searchQuery, setSearchQuery, handleSearch, isLoading }) {
  return (
    <div className="search-container">
      
      <input
        type="text"
        placeholder="Search the web..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
        aria-label="Search query input"
      />
      <button
        type="button" // Use 'button' to prevent form submission if wrapped in a form later
        onClick={handleSearch}
        className="search-btn"
        disabled={isLoading || !searchQuery.trim()}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}