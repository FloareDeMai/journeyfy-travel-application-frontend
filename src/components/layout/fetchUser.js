import axios from "axios"
import authHeader from "../../services/auth-header"

export const getUserById = (id) => {
    return axios.get(`http://localhost:8080/api/user/profile/${id}`, {headers: authHeader()})
        
}