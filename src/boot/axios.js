// src/boot/axios.js
import { boot } from "quasar/wrappers";
import axios from "axios";

// Use your Django machine's local IP address instead of localhost
//edit this:
const api = axios.create({ baseURL: "http://10.12.60.192:8000/api/users/" });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
