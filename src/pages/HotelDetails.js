import React from "react";
import styles from "./HotelDetails.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import { Rate } from "antd";

function HotelDetails(props) {
  const [hotel, setHotel] = useState();
  const [isLoading, setLoading] = useState(true);
  console.log(props.location.state.hotel.cityName);

  console.log(props.location.state);

  return (
    <div>
      <BreadcrumbHistory
        name="about"
        times={{
          pages: [
            { name: "places to stay", link: "/places-to-stay" },
            {name:props.location.state.hotel.name,
              link: "",
            },
          ],
        }}
      />
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <div className={styles.title}>
            <h1>{props.location.state.hotel.name}</h1>
          </div>
          <div className={styles.rating}>
            <Rate
              disabled
              allowHalf
              defaultValue={
                Math.round(props.location.state.hotel.rating * 100) / 100
              }
            />
            {Math.round(props.location.state.hotel.rating * 100) / 100} • PRET
            EURO{" "}
          </div>
          <div className={styles.hoursAndWebsiteLink}>
            <a href={props.location.state.hotel.siteLink}>
              Visit website{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.containerPhoto}>
          <div className={styles.topComments}>
            <h2>What people are saying:</h2>{" "}
          </div>
          <div className={styles.picture}>
            <img
              style={{ width: "100%" }}
              src={props.location.state.hotel.pictureLink}
              alt={props.location.state.hotel.name}
            ></img>
          </div>
        </div>
        <div className={styles.containerMap}>
          <div className={styles.locationDescription}>
            <h3>{props.location.state.hotel.description}</h3>
          </div>
          <div className={styles.map}>[MAP HERE]</div>
        </div>
        <div className={styles.containerUsers}>
          <div className={styles.writeReview}>
            <button>Write a review!</button>
          </div>
          <div className={styles.allReviews}>Comments:</div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
