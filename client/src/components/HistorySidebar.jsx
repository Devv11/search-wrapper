import React from 'react';
import { Clock, Search, X } from 'lucide-react';


export default function HistorySidebar({
  searchHistory = [],
  onHistoryClick = () => {},
  //onClearHistory = () => {},
  isOpen = false,
  onToggle = () => {},
}) {  
  return (
    <>
      <div className={`history-sidebar${isOpen ? ' open' : ''}`}>
        <div className="history-header">
          <h3 className="history-title">
            <Clock size={18} />
            Search History
          </h3>
          <button
            className="history-close-btn"
            onClick={onToggle}
            aria-label="Close history"
          >
            <X size={18} />
          </button>
        </div>
        <div className="history-content">
          {searchHistory.length > 0 ? (
            <>
              <div className="history-actions">
                <button
                  className="clear-history-btn"
                  //onClick={onClearHistory}
                >
                  Clear All
                </button>
              </div>
              <div className="history-list">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="history-item"
                    onClick={() => onHistoryClick(item.query)}
                  >
                    <Search size={14} />
                    <span className="history-query">{item.query}</span>
                    <span className="history-time">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="history-empty">
              <p>No search history yet</p>
            </div>
          )}
        </div>
      </div>
      {isOpen && <div className="history-overlay" onClick={onToggle}></div>}
    </>
  );
}