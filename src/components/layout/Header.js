import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, {useEffect, useState} from "react";


function Header() {
  const [user, setUser] = useState({})
  let userForFetch = JSON.parse(localStorage.getItem("user"));
  
  let loggedInUser = localStorage.getItem("user");

  
    useEffect(() => {
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, [loggedInUser]);

  const handleLogOut = () => {
    setUser({})
    localStorage.clear()
  }

  const menu = (
    <Menu>
      {loggedInUser ? 
      <Menu.Item>
        <Link to={`/wishlist/${userForFetch.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            viewBox="0 0 16 16"
            className={styles.link}
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </Link>
      </Menu.Item>: <Menu.Item></Menu.Item>}
      <Menu.Item>
        <Link to="/plan">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Plan
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link className={styles.link} to="/explore">
          Explore
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/places-to-stay">Places to stay</Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/things-to-do">Things to do</Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/journeys">Journeys</Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/about">About us</Link>
      </Menu.Item>

      {loggedInUser ? (
        <Menu.Item>
          <Button onClick={handleLogOut}>Log out</Button>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Link to="/signin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 12"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>{" "}
            &nbsp; Sign in
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerPicture}>
        <div className={styles.bothtext}>
          <div className={styles.border}>
            <div className={styles.text}>
              <h1>
                <Link className={styles.title} to="/">
                  Journeyfy
                </Link>
              </h1>
            </div>
            <div className={styles.textmotto}>
              <h5>Plan your escape</h5>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <ul className={styles.navbarOne}>
          {loggedInUser ? (
            <li className={styles.link}>
              <Link to={`/wishlist/${userForFetch.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="white"
                  viewBox="0 0 16 16"
                  className={styles.link}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </Link>
            </li>
          ) : (
            <li></li>
          )}
          <li className={styles.link}>
            <Link to="/plan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              Plan
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/explore">
              Explore
            </Link>
          </li>
          <li className={styles.link}>
            <Link to="/places-to-stay">Places to stay</Link>
          </li>
          <li className={styles.link}>
            <Link to="/things-to-do">Things to do</Link>
          </li>

          <li className={styles.link}>
            <Link to="/journeys">Journeys</Link>
          </li>
          <li className={styles.link}>
            <Link to="/about">About us</Link>
          </li>
        </ul>
        {loggedInUser ? (
          <Button className={styles.login} onClick={handleLogOut}>
            Log out
          </Button>
        ) : (
          <Link to="/signin">
            <div>
              <Button className={styles.login}>SIGN IN</Button>
            </div>
          </Link>
        )}

        <ul className={styles.navbarTwo}>
          <div className={styles.responsiveButton}>
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <MenuOutlined />
            </Dropdown>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
