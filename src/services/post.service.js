import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/posts"
const addPost = (entityId, userId, data) => {
    return axios.post(API_URL + `/new-post/${entityId}/${userId}`,
        data, { headers: authHeader() }
    )
}

const getAllPostsByEntityId = async (entityId) => {
    return await axios.get(API_URL + `/list/${entityId}`)
}

const editPost = async (postId, data) => {
    return await axios.put(API_URL + `/edit-post/${postId}`,
        data, { headers: authHeader() })
}

const PostService = {
    addPost,
    getAllPostsByEntityId,
    editPost
}

export default PostService