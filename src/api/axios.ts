import axios from 'axios';

// Directly use the API base URL
const API_BASE_URL = 'http://localhost:5199/api';

console.log('API Base URL:', API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;