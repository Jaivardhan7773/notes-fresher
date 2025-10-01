import { create } from 'zustand';
import axios from 'axios';

const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useNoteStore = create((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_ROOT}/api/notes`, { withCredentials: true });
      set({ notes: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getNote: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_ROOT}/api/notes/${id}`, { withCredentials: true });
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  createNote: async (title, content) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_ROOT}/api/notes`, { title, content }, { withCredentials: true });
      set(state => ({ notes: [...state.notes, res.data], loading: false }));
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  updateNote: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`${API_ROOT}/api/notes/${id}`, data, { withCredentials: true });
      set(state => ({
        notes: state.notes.map(note => (note._id === id ? res.data : note)),
        loading: false
      }));
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  deleteNote: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_ROOT}/api/notes/${id}`, { withCredentials: true });
      set(state => ({
        notes: state.notes.filter(note => note._id !== id),
        loading: false
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
