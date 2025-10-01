// src/stores/useAuthStore.js
import axios from 'axios'; 
import { create } from "zustand"

const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,


  isAuthenticated: () => !!get().user,


  login: async (idToken) => {
    set({ loading: true, error: null });
    try {
     
      const res = await axios.post(`${API_ROOT}/auth/google`, { idToken }, { withCredentials: true });
      const user = res.data?.user ?? res.data;
      set({ user, loading: false, error: null });
      return user;
    } catch (err) {
      const message = err?.response?.data?.error || err.message || 'Login failed';
      set({ error: message, loading: false });
      throw err;
    }
  },


  check: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_ROOT}/auth/check`, { withCredentials: true });
      const user = res.data?.user;
      set({ user, loading: false, error: null });
      return user;
    } catch (err) {
   
      set({ user: null, loading: false, error: null });
      return null;
    }
  },
  

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${API_ROOT}/auth/logout`, {}, { withCredentials: true });
      set({ user: null, loading: false, error: null });
    } catch (err) {
      const message = err?.response?.data?.error || err.message || 'Logout failed';
      set({ error: message, loading: false });
      throw err;
    }
  },


  setUser: (user) => set({ user }),


  clearError: () => set({ error: null })
}));
