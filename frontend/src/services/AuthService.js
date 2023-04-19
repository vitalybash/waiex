import axios from "axios";
import $api from "../http/index";

const register = (username, email, password) => {
  return $api.post("/register/register", {
    "user": {
      "username": username,
      "email": email,
      "password": password
    }
  })
};

const login = (email, password) => {
  return $api
    .post('/register/login', {
      "user": {
        "email": email,
        "password": password
      }
    })
    .then((response) => {
      if (response.data.user.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data.user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register, login, logout
};