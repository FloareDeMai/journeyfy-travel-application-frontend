import { React, useEffect, useState } from "react";
import { fetchUser } from "../components/layout/fetchUser";
import { Card } from "antd";
import styles from "./PlacesToStay.module.css";

const { Meta } = Card;

function Wishlist() {
  const [wishes, setWishes] = useState({});
  let userForFetch = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`http://localhost:8080/wish-list/all-wishes/${userForFetch.id}`).then(response => response.json())
    .then(data => setWishes(data))
  }, [userForFetch.id]);

  return (
    <div>
      <div className={styles.container}>
        {Object.keys(wishes).map((key) => {
            return (
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
                      alt={wishes[key].name}
                      src={wishes[key].entity.pictureLink}
                    />
                  </div>
                }
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {wishes[key].name}
                    </span>
                  }
                />
                <h3 className={styles.text}>
                  <span>
                    <small style={{ fontSize: "20px" }}>
                      Price: {wishes[key].entity.price} EUR
                    </small>
                  </span>
                </h3>
                <h3>
                  <span>
                    {wishes[key].entity.price
                      ? Number(wishes[key].entity.price).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                  </span>
                </h3>
              </Card>
            );
        })}
      </div>
    </div>
  );
}

export default Wishlist;


