import { createContext, useState } from "react";

const FavoritesContext = createContext({
    favorites: [],
    addFavorite: (favoriteActivity) => {},
    removeFavorite: (activityId) => {},
    itemIsFavorite: (activityId) => {}
})

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([])

    function addFavoriteHandler(favoriteActivity) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteActivity)
        })
    }

    function removeFavoriteHandler(activityId) {
        setUserFavorites((prevFavorites) => {
            return prevFavorites.filter((activity) => activity.id !== activityId)
        })
    } 

    function itemIsFavoriteHandler(activityId) {
        return userFavorites.some((activity) => activity.id === activityId)
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    }

    return (
        <FavoritesContext.Provider value={context}>
            {props.children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext