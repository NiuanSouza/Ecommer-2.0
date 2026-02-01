import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const token = localStorage.getItem("@Ecommerce:token");

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;