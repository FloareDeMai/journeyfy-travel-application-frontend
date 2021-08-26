import React from "react";
import { Link } from "react-router-dom";
import styles from "./Activity.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import { Rate } from 'antd';

function Activity(props) {
  let activity = props.location.state;
  console.log(props);

  return (
    <div>
      <BreadcrumbHistory
        name="about"
        times={{
          pages: [
            { name: "explore", link: "/explore" },
            {
              name: "cities",
              link: `/cities/${props.location.state.pathname}`,
            },
            {
              name: "activities",
              link: `/http://localhost:3000/activities/${activity.activity.geoCode.latitude}/${activity.activity.geoCode.longitude}`,
            },
            {
              name: `${activity.activity.name}`,
              link: `/http://localhost:3000/activities/${activity.activity.geoCode.latitude}/${activity.activity.geoCode.longitude}`,
            },
          ],
        }}
      />
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <div className={styles.title}>
            <h1>{activity.activity.name}</h1>
          </div>
          <div className={styles.rating}> <p><Rate disabled allowHalf defaultValue={Math.round((activity.activity.rating)*100)/100} /> {Math.round((activity.activity.rating)*100)/100} • {activity.activity.price.amount} {activity.activity.price.currencyCode} </p></div>
          <div className={styles.hoursAndWebsiteLink}>
            <a href={activity.activity.bookingLink}>
              Visit website{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-link"
                viewBox="0 0 16 10"
              >
                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.containerPhoto}>
          <div className={styles.topComments}><h2>What people are saying:</h2> </div>
          <div className={styles.picture}><img style={{width:'100%'}} src={activity.activity.pictures} alt={activity.activity.name}></img></div>
        </div>
        <div className={styles.containerMap}>
          <div className={styles.locationDescription}>
            <h3>{activity.activity.shortDescription}</h3>
          </div>
          <div className={styles.map}>[MAP HERE]</div>
        </div>
        <div className={styles.containerUsers}>
          <div className={styles.writeReview}><button>Write a review!</button></div>
          <div className={styles.allReviews}>Comments:</div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
