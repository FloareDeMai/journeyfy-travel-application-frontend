import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.headerpicture}>
        <div className={classes.bothtext}>
          <div className={classes.border}>
            <div className={classes.text}>
              <h1>
                <Link className={classes.title} to="/">
                  Journeyfy
                </Link>
              </h1>
            </div>
            <div className={classes.textmotto}>
              <h5>Plan your escape</h5>
            </div>
          </div>
        </div>
      </div>

      <nav>
        <ul>
          <li className={classes.link}>
            <Link to="/plan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              Plan
            </Link>
          </li>

          <li className={classes.link}>
            <Link to="/countries">Countries</Link>
          </li>

          <li className={classes.link}>
            <Link to="/favorites">Favorites</Link>
          </li>

          <li className={classes.link}>
            <Link to="/journeys">Journeys</Link>
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
