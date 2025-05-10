import api from '../api';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  signIn: async (data: SignInData) => {
    const response = await api.post('/auth/signin', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  signUp: async (data: SignUpData) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  signOut: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
}; 