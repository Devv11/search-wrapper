import React from "react"
import {Search} from "lucide-react"

export default function HeaderComponent({ searchQuery, setSearchQuery, handleSearch, isLoading }) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <Search size={16} />
          </div>
          <h1 className="app-title">SearchWrapper</h1>
        </div>
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search the web..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="Search query input"
          />
          <button
            type="submit" // Good practice for search forms
            onClick={handleSearch}
            className="search-btn"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  )
}