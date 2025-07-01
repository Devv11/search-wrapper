'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Renamed to avoid conflict with hook's performSearch function
async function searchAPI(query) {
  const response = await api.post('/api/search', { query });
  console.log('API response:', response.data);
  return response.data;
}

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState(null);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      // Now calls the correct API function instead of itself
      const response = await searchAPI(query);
      console.log('Search response:', response);
      
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
    clearResults,
  };
};