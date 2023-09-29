
import axios from 'axios';

const admininstance = axios.create({
  baseURL: 'http://localhost:3000', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  },
});


admininstance.interceptors.request.use(
  (config) => {
   
    config.headers.Authorization = `Bearer ${localStorage.getItem('admin_token')}`;
    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);

export default admininstance;
