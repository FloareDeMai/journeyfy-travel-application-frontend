import axios from "axios"
import authHeader from "../../services/auth-header"

export const getUserByUsername = (username) => {
    let auth = authHeader()
    console.log(auth)
    return axios.get(`http://localhost:8080/api/user/profile/${username}`, {headers: authHeader()})
        
}