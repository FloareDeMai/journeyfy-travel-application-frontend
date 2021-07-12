import React from 'react'
import {Link, Router} from 'react-router-dom'


function Navbar() {
    return (
        <div>
            <ul>
                <img src="" alt=""></img>

                <li>
                    <Link to="/cities">City List</Link>
                </li>

                <li>
                    <Link to="/favorites">Favorites Activities</Link>
                </li>

                <label htmlFor="search-city">Search</label>
                <input type="text" id="search-city"></input>
            </ul>
        </div>
    )
}

export default Navbar
