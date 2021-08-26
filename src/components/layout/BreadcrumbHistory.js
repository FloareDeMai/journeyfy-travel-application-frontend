import React from "react";
import {Link } from "react-router-dom";
import { Breadcrumb } from "antd";

import styles from "./BreadcrumbHistory.module.css";

function BreadcrumbHistory(props) {
  return (
    <div className={styles.breadcrumbContainer}>
      <Breadcrumb>
        <Breadcrumb.Item className={styles.breadcrumbHome}>
          <Link to="/">home</Link>
        </Breadcrumb.Item>
        {props.times.pages.map((item, index) => {
          return (
            <Breadcrumb.Item className={styles.breadcrumb}>
              {item.link !== "" ? (
                <Link to={`${item.link}`}>{item.name}</Link>
              ) : (
                <>{item.name}</>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbHistory;
