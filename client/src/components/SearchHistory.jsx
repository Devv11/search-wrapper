import React, { useState, useEffect } from 'react';
import { searchAPI } from '../services/api';

const SearchHistory = ({ onSelectQuery }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await searchAPI.getSearchHistory();
      if (response.success) {
        setHistory(response.data.searches);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await searchAPI.clearAllHistory();
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return (
    <div className="search-history">
      <button 
        className="history-toggle"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {showHistory && (
        <div className="history-panel">
          <div className="history-header">
            <h3>Search History</h3>
            <button onClick={handleClearHistory} className="clear-history">
              Clear All
            </button>
          </div>

          {loading ? (
            <div>Loading history...</div>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div key={item._id} className="history-item">
                  <div 
                    className="history-query"
                    onClick={() => onSelectQuery(item.query)}
                  >
                    {item.query}
                  </div>
                  <div className="history-meta">
                    {new Date(item.timestamp).toLocaleString()} • 
                    {item.resultCount} results
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;