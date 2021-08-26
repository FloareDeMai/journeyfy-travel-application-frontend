import axios from "axios";

export const addToWishlist = (wish) => {
    const URL = "http://localhost:8080/wish-list/add-wish"
    axios.post(URL, wish)
        .then(response => console.log(response))

}

