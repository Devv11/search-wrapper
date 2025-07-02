import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchAPI = {
  performSearch: async (query) => {
    const response = await api.post('/search', { query});
    return response.data;
  },

  // getSearchHistory: async (page = 1) => {
  //   const response = await api.get(`/history?page=${page}&limit=${limit}`);
  //   return response.data;
  // },

  // deleteSearchHistory: async (id) => {
  //   const response = await api.delete(`/history/${id}`);
  //   return response.data;
  // },

  // clearAllHistory: async () => {
  //   const response = await api.delete('/history');
  //   return response.data;
  // }
};

export default api;