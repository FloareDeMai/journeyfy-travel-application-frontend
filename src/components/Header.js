import React from 'react'
import {Link, Router} from 'react-router-dom'

import classes from './Header.module.css';


function Header() {
    return (
        <header className={classes.header}>
        <div className={classes.headerpicture}></div>
        <div className={classes.text}><h1>Journeyfy</h1></div>
        <div className={classes.textmotto}><h5>Trip your journey</h5></div>
            <nav>
            <ul>
                <li className={classes.link}>
                    <Link to="/countries">Country List</Link>
                </li>

                <li className={classes.link}>
                    <Link to="/favorites">Favorites Activities</Link>
                </li>

            </ul>
            </nav>
        </header>
    );
    
}

export default Header;
