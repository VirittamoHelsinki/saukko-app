import { create } from 'zustand';

const useStore = create((set) => ({
  name: '',
  email: '',
  password: '',
  passwordVerify: '',

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPasswordVerify: (passwordVerify) => set({ passwordVerify }),

  resetForm: () =>
    set({
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
    }),
}));

export default useStore;

