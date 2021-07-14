import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Header.module.css';


function Header() {
    return (
        <header className={classes.header}>
        <div className={classes.headerpicture}></div>
        <div className={classes.text}><h1>Journeyfy</h1></div>
        <div className={classes.textmotto}><h5>Plan your escape</h5></div>
            <nav>
            <ul>
                <li className={classes.link}>
                    <Link to="/countries">Countries</Link>
                </li>

                <li className={classes.link}>
                    <Link to="/favorites">Activities</Link>
                </li>

                <li className={classes.link}>
                    <Link to="/journeys">Journeys</Link>
                </li>

                <li className={classes.link}>
                    <Link to="/plan">Itinerary</Link>
                </li>

                <li className={classes.link}>
                    <Link to="/about">About us</Link>
                </li>

            </ul>
            </nav>
        </header>
    );
    
}

export default Header;
