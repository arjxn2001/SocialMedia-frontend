import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000",
  withCredentials: true,
});

export default apiRequest;