import React from "react";
import styles from "./UserPage.module.css";
import { Row, Col, Divider } from "antd";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

function UserPage() {
  return (
    <>
      <Row>
        <Col span={24} className={styles.upperBar}>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 250,
              xxl: 200,
            }}
            icon={<AntDesignOutlined 
            src={"https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg"}/>}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.sideBar}>
          col-12
        </Col>
        <Col span={18} style={{ backgroundColor: "green" }}>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
          <h1>dsafsaf</h1>
        </Col>
      </Row>
      <Row>
        <Col span={8} className={styles.baraReviewuri}>
          col-8
        </Col>
        <Col span={8} className={styles.baraCommenturi}>
          col-8
        </Col>
        <Col span={8} className={styles.baraBadge}>
          col-8
        </Col>
      </Row>
      <Row>
        <Col span={6} style={{ backgroundColor: "red" }}>
          col-6
        </Col>
        <Col span={6} style={{ backgroundColor: "black" }}>
          col-6
        </Col>
        <Col span={6} style={{ backgroundColor: "pink" }}>
          col-6
        </Col>
        <Col span={6} style={{ backgroundColor: "green" }}>
          col-6
        </Col>
      </Row>
    </>
  );
}

export default UserPage;
