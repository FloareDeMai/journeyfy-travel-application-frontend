import React, {useEffect, useState} from "react";
import styles from "./UserPage.module.css";
import { Row, Col } from "antd";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {fetchUser} from "../components/layout/fetchUser";

const menu = (
  <Menu className={styles.menu}>
    <Menu.Item>
      <Link className={styles.link} to="/lala">
        Activity feed
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className={styles.link} to="/lalga">
        Journeys
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className={styles.link} to="/lagdfla">
        Photos
      </Link>
    </Menu.Item>
  </Menu>
);

function UserPage() {
    let [user, setUser] = useState({})
    let userForFetch = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        fetchUser().then(data => {
            console.log(data)
            setUser(data)
        })
    },[userForFetch.id])


  return (
    <div className={styles.container}>
      <Row>
        <Col span={8} className={styles.upperBarMiddle}>
          <Avatar
            className={styles.avatar}
            size={{
              xs: 130,
              sm: 140,
              md: 200,
              lg: 210,
              xl: 230,
              xxl: 250,
            }}
            icon={<AntDesignOutlined />}
            src={
              "https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg"
            }
          />
          <h1 style={{ color: "black", margin: "0" }}>{user.username}</h1>
        </Col>
        <Col span={8} className={styles.upperBarLeft}>
          
        </Col>
        <Col span={8} className={styles.upperBarRight}>
          <div className={styles.buttonsLeft}>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </Button>
            <Button>Edit profile</Button>
          </div>
          <div className={styles.infoRight}>
            <div className={styles.followers}>
              <div className={styles.followersText}>
                <h2>Followers</h2>
              </div>
              <div className={styles.followersNumber}>
                <h2>0</h2>
              </div>
            </div>
            <div className={styles.following}>
              <div className={styles.followingText}>
                <h2>Following</h2>
              </div>
              <div className={styles.followingNumber}>
                <h2>0</h2>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.navbarUser}>
          {menu}
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.sideBar}>
        <div className={styles.location}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <p style={{fontSize:"20px"}}>Bucharest, Romania</p>
          </div>
          <div><p style={{fontSize:"17px"}}>Joined in Aug 2016</p></div>
          <h2>About me: </h2><br></br>
          <h3 style={{paddingRight:"40px"}}>saifj fjdsi fsd sdf sdf sdf sdfsd s fsd sd sdf sf sdf sdf sdf sd fsf sd fsd fsdfsdf sds sidjfi sdfjisd fsjd fisdjf idsj fisjf sdifjd sifdjs ifsdj ifdsj ifdsj fdsij fsdifjsd ifjsd i sijfs sfdi jsfdi fsjiifjs ifjs jfsij fisjf</h3>
        </Col>
        <Col span={18} className={styles.profileInfoContainer}>
        </Col>
      </Row>
      <Row>
        <Col span={8} className={styles.baraReviewuri}>
          <h1>Reviews:</h1>
        </Col>
        <Col span={8} className={styles.baraCommenturi}>
        <h1>Comments:</h1>
        </Col>
        <Col span={8} className={styles.baraBadge}>
        <h1>Awards:</h1>
        </Col>
      </Row>
    </div>
  );
}

export default UserPage;
