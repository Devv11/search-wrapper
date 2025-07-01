import React from "react";
import ResultCard from "./ResultCard";
import LoadingCard from "./LoadingCard";
import {Grid, List} from "lucide-react"


export default function SearchResultsDisplay({ viewMode, setViewMode, isLoading, searchResults }) {
  const hasResults = searchResults && searchResults.length > 0;
  
  return (
    <div className="results-section">
      {/* Results Header */}
      <div className="results-header">
        <div className="results-info">About {searchResults.length} results on this page</div>
        <div className="view-controls">
          <button
            type="button"
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="View as list"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="View as grid"
          >
            <Grid size={16} />
          </button>
        </div>
      </div>

      {/* Search Results */}
      {isLoading ? (
        <div className="results-container">
          {[...Array(3)].map((_, i) => ( // Render 3 loading cards
            <LoadingCard key={i} />
          ))}
        </div>
      ) : (
        <div className={`results-container ${viewMode === "grid" ? "grid" : ""}`}>
          {hasResults ? (
            searchResults.map((result) => (
              // FIX: Use `result.position` for the key, as `result.id` doesn't exist.
              <ResultCard key={result.position} result={result} />
            ))
          ) : (
            <div className="no-results">
              <p>No results found for your query. Try a different search or adjust filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}