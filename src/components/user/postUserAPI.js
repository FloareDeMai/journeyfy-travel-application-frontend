import axios from "axios";
import authHeader from "../../services/auth-header";

export const editUserProfile = (id, data, currentUsername) => {
  return axios.put(
    `http://localhost:8080/api/user/profile/${id}/edit-profile/${currentUsername}`,
    data,
    { headers: authHeader() }
  );
};



