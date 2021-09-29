import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

const register = (username, email, password, gender) => {
  return axios.post(API_URL + "add-user", {
    username,
    email,
    password,
    gender,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token")
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  addUserToLocalStorage,
};

export default AuthService;
