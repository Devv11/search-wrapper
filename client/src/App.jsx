import { useState } from "react"
import './index.css'
import HeaderComponent from "./components/HeaderComponent"
import PaginationComponent from "./components/PaginationComponent"
import SearchResultsDisplay from "./components/SearchResultsDisplay"
import SidebarFiltersComponent from "./components/SideBarFiltersComponent"
import { useSearch } from "./hooks/useSearch"




export default function SearchWrapper() {
  
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")
  //const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    searchEngine: "all",
    timeRange: "any",
    language: "en",
    contentTypes: {
      "Web pages": true,
      "Images": false,
      "Videos": false,
      "News": false,
      "Academic": false
    }
  })

  const { loading, results, searchInfo, error, performSearch } = useSearch();

  // Mock search results (kept outside for clarity, could be dynamic based on search/filters)
  const allSearchResults =results
  // For demonstration, filter results based on a simple query match
  // const filteredSearchResults = allSearchResults.filter(result =>
  //   result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    if (searchQuery.trim()) { // Only search if there's a query
      performSearch(searchQuery); // Call the search function from your hook
    }
  };

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Use the actual `results` from the useSearch hook for display
  const currentResults = results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
    setCurrentPage(1) // Reset to first page on filter change
  }

  const handleContentTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      contentTypes: {
        ...prev.contentTypes,
        [type]: !prev.contentTypes[type]
      }
    }))
    setCurrentPage(1) // Reset to first page on filter change
  }


  return (
    <div className="search-wrapper">

      {/* Header */}
      <HeaderComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={loading}
      />

      <div className="main-content">
        {/* Sidebar Filters */}
        <SidebarFiltersComponent
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleContentTypeChange={handleContentTypeChange}
        />

        {/* Main Content (Search Results and Pagination) */}
        <SearchResultsDisplay
          viewMode={viewMode}
          setViewMode={setViewMode}
          isLoading={loading}
          searchResults={currentResults} // Pass paginated results
        />

        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}
