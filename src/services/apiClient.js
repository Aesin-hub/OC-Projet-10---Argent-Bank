import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Intercepteur pour ajouter automatiquement le token si présent
export const injectToken = (store) => {
  api.interceptors.request.use((config) => {
    const token = store.getState()?.auth?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default api;
