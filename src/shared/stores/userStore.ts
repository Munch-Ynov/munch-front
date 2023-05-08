/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import type { LoginForm, User } from "../interfaces";
import { fetchCurrentUser, login } from "../services";

interface UserState {
  currentUser: User | null;
  token: string | null;
  isAuth: boolean;
}

export const useUser = defineStore("user", {
  state: (): UserState => ({
    currentUser: null,
    token: localStorage.getItem("user-token"),
    isAuth: false,
  }),
  getters: {
    isAuthenticated(state): boolean | null {
      // console.log(state.currentUser);
      // console.log(state.isAuth);
      // console.log(state.token);

      if (state.currentUser) {
        return true;
      } else if (!state.currentUser && state.isAuth) {
        return false;
      } else {
        return null;
      }
    },
  },
  actions: {
    async login(loginForm: LoginForm) {
      try {
        const response = await login(loginForm);
        // if(this.currentUser) this.isAuth = true;
        if (response && response.accessToken && response.user) {
          localStorage.setItem("user-token", response.accessToken);
          this.currentUser = response.user;
          this.isAuth = true;
        } else {
          throw new Error("No user to login");
        }
      } catch (e) {
        localStorage.removeItem("user-token");
        throw e;
      }
    },
    async logout() {
      if (!this.currentUser) throw new Error("No user to logout");
      // await logout(this.currentUser.id);
      this.currentUser = null;
      this.isAuth = false;
      localStorage.removeItem("user-token");
    },
    async fetchCurrentUser() {
      const token = localStorage.getItem("user-token");
      if (!token) {
        this.isAuth = false;
        // throw new Error('No token');
      }
      try {
        this.currentUser = await fetchCurrentUser();
        this.isAuth = true;
      } catch (e) {
        this.currentUser = await fetchCurrentUser();
        this.isAuth = false;
        throw e;
      }
      // this.isAuth = true;
    },
  },
});
