import classes from './Favorites.module.css';
import { useContext } from 'react'
import FavoritesContext from '../store/favorites-context';
import ActivityList from './ActivityList';


function Favorites() {
    const favoritesCtx = useContext(FavoritesContext)
    let content;
    if (favoritesCtx.totalFavorites === 0) {
        content = <p>You got not favorites yet...</p>
    } else {
        content = <ActivityList activities={favoritesCtx.favorites}></ActivityList>
    }

    return <div>
        <section>
            <h1>My Favorites</h1>
            {content}
            </section>
    </div>
}

export default Favorites;