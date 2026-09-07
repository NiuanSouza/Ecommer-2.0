import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommer-2-0.onrender.com",
});

const token = localStorage.getItem("@Ecommerce:token");

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}


export default api;