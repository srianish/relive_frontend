import axios from "axios";

const api = axios.create({
 baseURL: "https://relive-backend-1.onrender.com"
});

export default api;