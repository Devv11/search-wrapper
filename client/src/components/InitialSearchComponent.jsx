import React from "react";
import { Search } from "lucide-react";
import SearchInputComponent from "./SearchInputComponent"; // Import the new component

export default function InitialSearchComponent({ searchQuery, setSearchQuery, handleSearch, isLoading }) {
  return (
    <div className="initial-view">
      <div className="logo-section">
        
        <h1 className="app-title">SearchWrapper</h1>
      </div>
      {/* Use the new reusable component here */}
      <SearchInputComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  );
}