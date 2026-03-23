import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default api;
const BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.production.VITE_API_URL;
console.log(BASE_URL);
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
