import axios from 'axios';
import {Platform, Alert} from 'react-native';

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
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Alert.alert('Request Error', error.message);
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    }
    return response;
  },
  error => {
    if (error.response) {
      Alert.alert(
        'Response Error',
        `Status: ${error.response.status}`,
        error.response.data,
      );
    } else if (error.request) {
      Alert.alert('No Response', 'No response received from the server.');
    } else {
      Alert.alert('Error', error.message);
    }
    return Promise.reject(error);
  },
);

export default http;
