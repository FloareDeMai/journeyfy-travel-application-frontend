export const fetchUser = () => {
    let userForFetch = JSON.parse(localStorage.getItem('user'))
    return fetch(`http://localhost:8080/api/user/${userForFetch.id}`)
        .then(response =>  response.json())
}