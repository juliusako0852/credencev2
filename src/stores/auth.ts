import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null
  }),
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await api.post("/api/auth/login/", {
          username,
          password
        });
        this.token = response.data.access;

        if (this.token) {
          localStorage.setItem("token", this.token);
          api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        }

        // Set the authorization header for subsequent Axios requests
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        return true;
      } catch (error) {
        console.error("Login failed", error);
        return false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  }
});
