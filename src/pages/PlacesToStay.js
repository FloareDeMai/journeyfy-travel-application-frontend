import React from "react";
import { useState, useEffect } from "react";
import styles from "./PlacesToStay.module.css";
import { Card } from "antd";
import { Link } from "react-router-dom";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";

const { Meta } = Card;

function PlacesToStay(props) {
  let [hotels, setHotels] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const URL = "http://localhost:8080/hotels/all-hotels";

  useEffect(() => {
    fetch(URL).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setHotels(data);
        setLoading(false);
      })
    );
  }, []);

  const handleClickWishIcon = async e => {

  }

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
    <div>
      <h1 className={styles.title}>Where do you want to stay .. ?</h1>
      <div className={styles.container}>
        <BreadcrumbHistory
          name="about"
          times={{
            pages: [{ name: "places to stay", link: "" }],
          }}
        />

        {hotels.map((hotel) => {
          return (
            <Link
              key={hotel.name}
              to={{
                pathname: `/places-to-stay/${hotel.name}`,
                state: { hotel: hotel },
              }}
            >
              <Card
                className={styles.hozoccard}
                hoverable
                style={{
                  width: 300,
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
                cover={
                  <div>
                    <img
                      className={styles.cardImage}
                      alt={hotel.name}
                      src={hotel.pictureLink}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className={styles.wishIcon}
                      viewBox="0 0 16 16"
                      onClick={handleClickWishIcon}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </div>
                }
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {hotel.name}
                    </span>
                  }
                />
                <h3 className={styles.text}>
                  <span>
                    <small style={{ fontSize: "20px" }}>
                      Price: {hotel.price} EUR
                    </small>
                  </span>
                </h3>
                <h3>
                  <span>
                    {hotel.rating
                      ? Number(hotel.rating).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                  </span>
                </h3>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToStay;
