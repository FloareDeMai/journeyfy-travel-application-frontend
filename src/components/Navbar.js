import React from 'react'
import {Link, Router} from 'react-router-dom'


function Navbar() {
    return (
        <div>
            <ul>
                <img src="" alt=""></img>

                <li>
                    <Link to="/countries">Country List</Link>
                </li>

                <li>
                    <Link to="/favorites">Favorites Activities</Link>
                </li>

            </ul>
        </div>
    )
}

export default Navbar
