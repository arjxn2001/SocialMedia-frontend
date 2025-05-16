import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://socialmedia-backend-fu0q.onrender.com",
    withCredentials: true,
})

export default apiRequest;