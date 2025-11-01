import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important: allows browser to send cookies
});
export default api;
