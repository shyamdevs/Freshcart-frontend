import axios from 'axios';
import API from './api';
import { getToken, logout } from './auth';

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRoute = err.config?.url?.includes('/signin') || 
                        err.config?.url?.includes('/signup') || 
                        err.config?.url?.includes('/forgetpass') ||
                        err.config?.url?.includes('/resetpassword');
    if (err.response?.status === 401 && !isAuthRoute) {
      logout();
      window.location.href = '/Signin';
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
