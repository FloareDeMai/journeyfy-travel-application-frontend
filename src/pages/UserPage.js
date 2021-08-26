import React from "react";
import styles from "./UserPage.module.css";
import { Row, Col, Divider } from "antd";

function UserPage() {
  return (
    <>
      <Row>
        <Col span={24} className={styles.baraSus}>col</Col>
      </Row>
      <Row>
        <Col span={6} className={styles.baraLaterala}>col-12</Col>
        <Col span={18} style={{backgroundColor: 'green'}}>col-12</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.baraReviewuri}>col-8</Col>
        <Col span={8} className={styles.baraCommenturi}>col-8</Col>
        <Col span={8} className={styles.baraBadge}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}style={{backgroundColor: 'red'}}>col-6</Col>
        <Col span={6}style={{backgroundColor: 'black'}}>col-6</Col>
        <Col span={6}style={{backgroundColor: 'pink'}}>col-6</Col>
        <Col span={6}style={{backgroundColor: 'green'}}>col-6</Col>
      </Row>
    </>
  );
}

export default UserPage;
