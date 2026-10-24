import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://10.12.60.192:8000/"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
});

export { api };
