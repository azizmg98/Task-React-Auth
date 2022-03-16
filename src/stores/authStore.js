import instance from "./instance";
import decode from "jwt-decode";
import { makeAutoObservable } from "mobx";

class AuthStore {
  // initialize user variable for signup & signin
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  signup = async (userData) => {
    try {
      const res = await instance.post("/users/signup", userData);
      const { token } = res.data;
      this.setUser(token);
    } catch (error) {
      console.error(error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/users/signin", userData);
      const { token } = res.data;
      this.setUser(token);
    } catch (error) {
      console.error(error);
    }
  };

  signout = () => {
    localStorage.removeItem("token");
    this.user = null;
  };

  setUser = async (token) => {
    this.user = decode(token);
    localStorage.setItem("token", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  checkForToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = decode(token);
      if (Date.now() < decodedToken.exp) {
        this.user = decodedToken;
      } else {
        this.signout();
      }
    }
  };
}

const authStore = new AuthStore();

authStore.checkForToken();

export default authStore;
