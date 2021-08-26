import { Card } from "antd";
import { Link } from "react-router-dom";
import styles from "./Cities.module.css";
import React, { useEffect, useState } from "react";
import Amadeus from "amadeus";

import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
// import {useHistory} from 'react-router-dom';

const { Meta } = Card;

function Activities(props) {
  // let history = useHistory();
  const [isLoading, setLoading] = useState(true);
  let [activities, setActivities] = useState([]);
  // let [clubs, setClubs] = useState([]);
  // let [museums, setMuseums] = useState([]);
  console.log(props.location.state.latitude)

  useEffect(() => {
    let amadeus = new Amadeus({
      clientId: "JwAIsSldNtbkAlHgz0n4qlXOKQ74lmoJ",
      clientSecret: "G34bHqYphuBO84A1",
    });

    amadeus.shopping.activities
      .get({
        latitude: props.location.state.latitude,
        longitude: props.location.state.longitude,
      })
      .then((response) => {
        setActivities(response.data);
        console.log(response.data);
        setLoading(false);
      });
  }, [props]);

  if (isLoading) {
    return (
      <div className={styles.containerLoading}>
        <div className={styles.ldsellipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BreadcrumbHistory
        name="about"
        times={{
          pages: [
            { name: "explore", link: "/explore" },
            { name: "cities", link: `/cities/${props.location.state.pathname}` },
            {name:'activities', link: ""}
          ],
        }}
      />
      {activities.length > 0 && !isLoading ? (
        activities.map((activity) => {
          return (
            <Link
              key={activity.name}
              to={{
                pathname: `/activity/${activity.name}`,
                state: {
                  activity: activity,
                },
              }}
            >
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img alt={activity.name} src={activity.pictures[0]}></img>
                }
              >
                <Meta
                  title={
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {activity.name}
                    </span>
                  }
                />
                <h3 className={styles.text}>
                  <span>
                    Price: {activity.price.amount} {activity.price.currencyCode}
                  </span>
                </h3>
                <h3>
                  <span>
                    Rating:{" "}
                    {activity.rating
                      ? Number(activity.rating).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                  </span>
                </h3>
              </Card>
            </Link>
          );
        })
      ) : (
        <div style={{ textAlign: "center" }} className={styles.nodata}>
          <img src="https://img.icons8.com/ios/96/000000/file-delete.png" alt="delete"/>
          <br></br>
          <br></br>
          <h1>NO ACTIVITIES YET</h1>
        </div>
      )}
    </div>
  );
}

export default Activities;
