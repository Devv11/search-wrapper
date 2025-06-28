import { useState } from "react"
import './index.css'
import HeaderComponent from "./components/HeaderComponent"
import PaginationComponent from "./components/PaginationComponent"
import SearchResultsDisplay from "./components/SearchResultsDisplay"
import SidebarFiltersComponent from "./components/SideBarFiltersComponent"

export default function SearchWrapper() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")
  const [isLoading, setIsLoading] = useState(false)
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

  // Mock search results (kept outside for clarity, could be dynamic based on search/filters)
  const allSearchResults = [
    {
      id: 1,
      title: "Advanced Web Development Techniques",
      url: "https://example.com/web-dev",
      description:
        "Learn modern web development techniques including React, Next.js, and TypeScript. This comprehensive guide covers everything from basic concepts to advanced patterns.",
      domain: "example.com",
      timestamp: "2 hours ago",
      rating: 4.8,
      tags: ["Web Development", "React", "TypeScript"],
    },
    {
      id: 2,
      title: "Complete Guide to API Design",
      url: "https://api-guide.dev/complete",
      description:
        "Master API design principles with REST, GraphQL, and modern authentication patterns. Includes real-world examples and best practices.",
      domain: "api-guide.dev",
      timestamp: "5 hours ago",
      rating: 4.9,
      tags: ["API", "REST", "GraphQL"],
    },
    {
      id: 3,
      title: "Database Optimization Strategies",
      url: "https://dboptimize.com/strategies",
      description:
        "Improve your database performance with proven optimization techniques. Covers indexing, query optimization, and scaling strategies.",
      domain: "dboptimize.com",
      timestamp: "1 day ago",
      rating: 4.7,
      tags: ["Database", "Performance", "SQL"],
    },
    {
      id: 4,
      title: "Cloud Architecture Patterns",
      url: "https://cloudpatterns.io/architecture",
      description:
        "Explore cloud-native architecture patterns for scalable applications. Learn about microservices, serverless, and container orchestration.",
      domain: "cloudpatterns.io",
      timestamp: "2 days ago",
      rating: 4.6,
      tags: ["Cloud", "Architecture", "Microservices"],
    },
    {
      id: 5,
      title: "Introduction to Machine Learning",
      url: "https://ai-academy.org/ml-intro",
      description:
        "A beginner-friendly introduction to machine learning concepts, algorithms, and practical applications.",
      domain: "ai-academy.org",
      timestamp: "3 days ago",
      rating: 4.5,
      tags: ["Machine Learning", "AI", "Algorithms"],
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      url: "https://secure-bytes.com/fundamentals",
      description:
        "Understand the basics of cybersecurity, including common threats, protective measures, and best practices for online safety.",
      domain: "secure-bytes.com",
      timestamp: "4 days ago",
      rating: 4.7,
      tags: ["Cybersecurity", "Security", "Privacy"],
    },
  ]

  // For demonstration, filter results based on a simple query match
  const filteredSearchResults = allSearchResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = () => {
    setIsLoading(true)
    setCurrentPage(1) // Reset to first page on new search
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this is where you'd fetch data based on searchQuery and filters
      // setSearchResults(fetchedData);
    }, 1000)
  }

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

  // Define how many items per page (for a real pagination scenario)
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = filteredSearchResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSearchResults.length / itemsPerPage);


  return (
    <div className="search-wrapper">

      {/* Header */}
      <HeaderComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
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
          isLoading={isLoading}
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
