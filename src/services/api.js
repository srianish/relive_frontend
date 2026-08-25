import axios from "axios";

const api = axios.create({
 baseURL: "https://relive-backend-1.onrender.com"
});

export default api;
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

// export default api;