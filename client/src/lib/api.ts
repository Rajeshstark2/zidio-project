import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const apiEndpoints = {
  // Auth endpoints
  register: `${API_BASE_URL}/register`,
  login: `${API_BASE_URL}/login`,
  forgotPassword: {
    verifyEmail: `${API_BASE_URL}/forgot-password/verify-email`,
    verifyAnswer: `${API_BASE_URL}/forgot-password/verify-answer`,
    reset: `${API_BASE_URL}/forgot-password/reset`
  },
  
  // Blog endpoints
  blogs: `${API_BASE_URL}/blogs`,
  userBlogs: (userId: string) => `${API_BASE_URL}/blogs/user/${userId}`,
  blogById: (id: string) => `${API_BASE_URL}/blogs/${id}`,
  blogBySlug: (slug: string) => `${API_BASE_URL}/blogs/${slug}`
};

export default api; 