import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // or 'http://localhost:5000/api' if no proxy
});

// ✅ Request interceptor to add token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token attached:', token); // temporary for debugging
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;