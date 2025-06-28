import { useState, useCallback } from 'react';
import { searchAPI } from '../services/api';

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState(null);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query, start = 1, num = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchAPI.performSearch(query, start, num);
      if (response.success) {
        setResults(response.data.results);
        setSearchInfo(response.data.searchInformation);
      } else {
        setError('Search failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setSearchInfo(null);
    setError(null);
  }, []);

  return {
    loading,
    results,
    searchInfo,
    error,
    performSearch,
    clearResults
  };
};