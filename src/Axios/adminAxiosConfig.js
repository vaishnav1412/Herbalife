
import axios from 'axios';

const admininstance = axios.create({
  baseURL: "https://herbalproject.online", 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  },
  
});

admininstance.interceptors.request.use(
 
  (config) => {
   
    config.headers.Authorisation = `Bearer ${localStorage.getItem('admin_token')}`;
  

    return config;
  },
  (error) => {
   
    console.log(error)
    return Promise.reject(error);
  }
);

export default admininstance;
