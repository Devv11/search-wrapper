import React, { useState } from "react"
import { Search, History } from "lucide-react"
import SearchInputComponent from "./SearchInputComponent"
import HistorySidebar from "./HistorySidebar"

export default function HeaderComponent({
  searchQuery,
  setSearchQuery,
  handleSearch,
 
  searchHistory = [],
  handleHistoryClick = () => {},
  //handleClearHistory = () => {},
}) {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <Search size={16} />
          </div>
          <h1 className="app-title">SearchWrapper</h1>
        </div>
        <SearchInputComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          //isLoading={isLoading}
        />
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="logo-history"
          aria-label="Search History"
        >
          <History size={18} />
        </button>
        
          <HistorySidebar
            isOpen={showHistory}
            onToggle={() => setShowHistory(false)}
            searchHistory={searchHistory}
            onHistoryClick={handleHistoryClick}
            //onClearHistory={handleClearHistory}
          />
        
      </div>
    </div>
  )
}