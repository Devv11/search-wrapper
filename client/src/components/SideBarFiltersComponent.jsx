import React from "react"
import {Filter} from "lucide-react"

export default function SidebarFiltersComponent({ filters, handleFilterChange, handleContentTypeChange }) {
  return (
    <div className="sidebar">
      <div className="filter-card">
        <div className="filter-header">
          <h2 className="filter-title">
            <Filter size={16} />
            Search Filters
          </h2>
        </div>
        <div className="filter-content">
          <div className="filter-group">
            <label htmlFor="search-engine-select" className="filter-label">Search Engine</label>
            <div className="select-wrapper">
              <select
                id="search-engine-select"
                className="select"
                value={filters.searchEngine}
                onChange={(e) => handleFilterChange('searchEngine', e.target.value)}
              >
                <option value="all">All Engines</option>
                <option value="google">Google</option>
                <option value="bing">Bing</option>
                <option value="duckduckgo">DuckDuckGo</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="time-range-select" className="filter-label">Time Range</label>
            <div className="select-wrapper">
              <select
                id="time-range-select"
                className="select"
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              >
                <option value="any">Any time</option>
                <option value="hour">Past hour</option>
                <option value="day">Past 24 hours</option>
                <option value="week">Past week</option>
                <option value="month">Past month</option>
                <option value="year">Past year</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Content Type</label>
            <div className="checkbox-group">
              {Object.entries(filters.contentTypes).map(([type, checked]) => (
                <div key={type} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`content-type-${type.toLowerCase().replace(/\s/g, '-')}`} // More robust ID
                    className="checkbox"
                    checked={checked}
                    onChange={() => handleContentTypeChange(type)}
                  />
                  <label htmlFor={`content-type-${type.toLowerCase().replace(/\s/g, '-')}`} className="checkbox-label">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="language-select" className="filter-label">Language</label>
            <div className="select-wrapper">
              <select
                id="language-select"
                className="select"
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}