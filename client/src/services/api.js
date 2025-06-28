import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchAPI = {
  performSearch: async (query, start = 1, num = 10) => {
    const response = await api.post('/search', { query, start, num });
    return response.data;
  },

  getSearchHistory: async (page = 1, limit = 20) => {
    const response = await api.get(`/history?page=${page}&limit=${limit}`);
    return response.data;
  },

  deleteSearchHistory: async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
  },

  clearAllHistory: async () => {
    const response = await api.delete('/history');
    return response.data;
  }
};

export default api;