import axios from 'axios';

// API base URL - Update this based on your environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/register';
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ENDPOINTS ==========
export const authAPI = {
  register: (userData) => {
    if (userData instanceof FormData) {
      return apiClient.post('/auth/register', userData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    return apiClient.post('/auth/register', userData);
  },
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getMe: () => apiClient.get('/auth/me'),
};

// ========== USER ENDPOINTS ==========
export const userAPI = {
  getAllUsers: () => apiClient.get('/users'),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  getAllDoctors: () => apiClient.get('/users/role/doctor'),
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
};

// ========== DISCUSSION ENDPOINTS ==========
export const discussionAPI = {
  getAllDiscussions: (params) => apiClient.get('/discussions', { params }),
  createDiscussion: (data) => apiClient.post('/discussions', data),
  getDiscussionById: (id) => apiClient.get(`/discussions/${id}`),
  updateDiscussion: (id, data) => apiClient.put(`/discussions/${id}`, data),
  deleteDiscussion: (id) => apiClient.delete(`/discussions/${id}`),
  addReply: (id, data) => apiClient.post(`/discussions/${id}/reply`, data),
  likeDiscussion: (id) => apiClient.post(`/discussions/${id}/like`),
};

// ========== STUDY ENDPOINTS ==========
export const studyAPI = {
  getAllStudies: (params) => apiClient.get('/studies', { params }),
  createStudy: (data) => apiClient.post('/studies', data),
  getStudyById: (id) => apiClient.get(`/studies/${id}`),
  updateStudy: (id, data) => apiClient.put(`/studies/${id}`, data),
  deleteStudy: (id) => apiClient.delete(`/studies/${id}`),
  likeStudy: (id) => apiClient.post(`/studies/${id}/like`),
};

// ========== CONTACT ENDPOINTS ==========
export const contactAPI = {
  submitContact: (data) => apiClient.post('/contact', data),
  getAllContacts: (params) => apiClient.get('/contact', { params }),
  getMyContacts: () => apiClient.get('/contact/mine'),
  getContactById: (id) => apiClient.get(`/contact/${id}`),
  bookModerator: (id) => apiClient.post(`/contact/${id}/book-moderator`),
  assignDoctor: (id, data) => apiClient.post(`/contact/${id}/assign-doctor`, data),
  addReply: (id, data) => apiClient.post(`/contact/${id}/reply`, data),
  updateStatus: (id, data) => apiClient.put(`/contact/${id}/status`, data),
};

export default apiClient;
