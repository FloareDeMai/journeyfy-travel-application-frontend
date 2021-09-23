import axios from "axios";
import authHeader from '../../services/auth-header'



export const editUserProfile =  (username, token, data) => {
    try {
        axios.post(`http://localhost:8080/api/user/profile/${username}/edit-profile`, data, {headers: authHeader()}).then(res => {
            let data = {"token": token, ...res.data}
            localStorage.setItem("user", JSON.stringify(data))
        
        })
    } catch (error) {
        console.log(error);
    }
}