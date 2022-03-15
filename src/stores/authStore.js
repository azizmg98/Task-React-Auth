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
      this.user = decode(res.data.token);
      console.log(this.user);
    } catch (error) {
      console.error(error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/users/signin", userData);
      this.user = decode(res.data.token);
      console.log(this.user);
    } catch (error) {
      console.error(error);
    }
  };
}

const authStore = new AuthStore();

export default authStore;
