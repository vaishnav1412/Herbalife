
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://herbalproject.online', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  },
});

console.log('hai..test');
instance.interceptors.request.use(
  (config) => {
   
    config.headers.Authorisation = `Bearer ${localStorage.getItem('token')}`;

    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);

export default instance;
