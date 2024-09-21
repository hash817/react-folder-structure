import Axios from 'axios';

// Request Interceptor
function authRequestInterceptor(config) {
    if (config.headers) {
      config.headers.Accept = 'application/json';
    }
    return config;
  }

export const api = Axios.create({
    baseURL: "http://localhost/api/",
    withCredentials: true,
});

api.interceptors.request.use(authRequestInterceptor);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message = error.response?.data?.message || error.message;  
      return Promise.reject(error);
    }
);