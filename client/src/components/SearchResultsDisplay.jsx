import React from "react";
import ResultCard from "./ResultCard";
import LoadingCard from "./LoadingCard";

import { Grid, List } from "lucide-react";

export default function SearchResultsDisplay({
  viewMode,
  setViewMode,
  isLoading,
  searchResults,
  searchQuery, // Receive the query
  totalResults,
}) {
  const hasResults = searchResults && searchResults.length > 0;
  const showResultsHeader = isLoading || hasResults || totalResults > 0;

  return (
    <>
      {showResultsHeader && (
        <div className="results-header">
          <div className="results-info">
            {isLoading ? "Searching..." : `About ${totalResults} results`}
          </div>
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
      )}

      <div className="results-outer">
        <div className={`results-container ${viewMode === "grid" ? "grid" : ""}`}>
          {isLoading ? (
            [...Array(3)].map((_, i) => <LoadingCard key={i} />)
          ) : hasResults ? (
            searchResults.map((result) => (
              <ResultCard key={result.position} result={result} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}