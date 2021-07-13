import React from 'react'
import {Link, Router} from 'react-router-dom'

import classes from './Header.module.css';


function Header() {
    return (
        <header className={classes.header}>
        <div className={classes.headerpicture}></div>
            <nav>
            <ul>
                <li>
                    <Link to="/countries">Country List</Link>
                </li>

                <li>
                    <Link to="/favorites">Favorites Activities</Link>
                </li>

            </ul>
            </nav>
        </header>
    );
    
}

export default Header;
