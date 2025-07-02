import { useState } from "react";
import './index.css';
import HeaderComponent from "./components/HeaderComponent";
import PaginationComponent from "./components/PaginationComponent";
import SearchResultsDisplay from "./components/SearchResultsDisplay";

import InitialSearchComponent from "./components/InitialSearchComponent";
import { useSearch } from "./hooks/useSearch";

export default function SearchWrapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false); // New state for layout control


  const { loading, results, performSearch } = useSearch();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentPage(1);
      setHasSearched(true); // Trigger the results view
      performSearch(searchQuery);
    }
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    performSearch(query);
  };

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // if (!hasSearched) {
  //   return (
  //     <InitialSearchComponent
  //       searchQuery={searchQuery}
  //       setSearchQuery={setSearchQuery}
  //       handleSearch={handleSearch}
  //       isLoading={loading}
  //     />
  //   );
  // }

  return (
    <div className="search-wrapper">
      <HeaderComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}

        
        handleHistoryClick={handleHistoryClick}
        //handleClearHistory={handleClearHistory}
      />
      <div className="main-content">

        <div className="results-section-wrapper">
          <SearchResultsDisplay
            viewMode={viewMode}
            setViewMode={setViewMode}
            isLoading={loading}
            searchResults={currentResults}
            searchQuery={searchQuery} // Pass query for 'no results' message
            totalResults={results.length}
          />
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}