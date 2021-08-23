import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";

const menu = (
  <Menu>
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
      <Link to="/top-hotels">Places to stay</Link>
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
  </Menu>
);

function Header() {
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
            <Link to="/top-hotels">Places to stay</Link>
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
