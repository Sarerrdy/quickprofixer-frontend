import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5199/api';
// const API_BASE_URL = 'http://172.31.41.59:5199/api'; // private ip
const API_BASE_URL = 'http://63.177.70.65:5199/api'; // public ip
// const API_BASE_URL = 'https://api.quickprofixer.com/api'; // public ip

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

// Add a request interceptor to log the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request Headers:', config.headers); // Log the request headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;