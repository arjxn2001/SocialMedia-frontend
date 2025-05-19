import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://socialmedia-backend-fu0q.onrender.com",  //"http://localhost:3000/"https://socialmedia-backend-fu0q.onrender.com
  withCredentials: true, // keep this if your backend uses cookies (optional)
});

// ✅ Add the interceptor to attach the token
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage, depending on your app
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiRequest;
