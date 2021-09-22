import axios from "axios";
import authHeader from '../../services/auth-header'

export const editUserProfile = async (username, data) => {
    try {
        axios.patch(`http://localhost:8080/api/user/profile/${username}/edit-profile`, data, {headers: authHeader()})
    } catch (error) {
        console.log(error);
    }
}