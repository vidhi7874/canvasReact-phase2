import axios from 'axios';
import { config } from '../configuration/configuration';

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
