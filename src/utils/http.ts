// src/utils/http.ts
import axios from 'axios';
import {Platform} from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'ios') {
    return 'http://localhost:3002/bp';
  }
  return 'http://10.0.2.2:3002/bp';
};

const http = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

http.interceptors.request.use(
  config => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      params: config.params,
    });
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    if (response.status === 200) {
      return response.data;
    }
    return response;
  },
  error => {
    if (error.response) {
      console.error('Response error:', {
        url: error.config.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  },
);

export default http;
