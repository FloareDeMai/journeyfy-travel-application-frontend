import axios from "axios";
import {useHistory} from "react-router-dom"

const API_URL = "http://localhost:8080/api/user/";

const register = (username, email, password, gender) => {
    return axios.post(API_URL + "add-user", {
        username,
        email,
        password,
        gender
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
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {register,
    login,
    logout,
    getCurrentUser}

export default AuthService;