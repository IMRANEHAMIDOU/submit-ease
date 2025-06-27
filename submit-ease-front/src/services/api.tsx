import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ou l'URL de ton backend en ligne plus tard
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('_auth')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})


export default api;