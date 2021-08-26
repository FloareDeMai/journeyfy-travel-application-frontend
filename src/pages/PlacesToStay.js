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
                pathname: `/${hotel.cityName}`,
              }}
            >
              <Card
                hoverable
                style={{ width: 300 }}
                cover={<img alt={hotel.name} src={hotel.pictureLink} />}
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
                  <span><small style={{fontSize: "20px"}}>Price: {hotel.price} EUR</small></span>
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
