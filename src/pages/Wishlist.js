import {React, useEffect, useState} from "react";
import {fetchUser} from "./fetchUser";
import {Card} from "antd";
import styles from "./ThingsToDo.module.css";

const {Meta} = Card;


function Wishlist() {
    const [wishes, setWishes] = useState({})
    const [eachWish, setEachWish] = useState({})
    useEffect(() => {
        fetchUser().then(data => setWishes(data.wish))
    }, [wishes])


    return (
        Object.keys(wishes).map(key =>
            <div className={styles.container}>
            <Card className={styles.hozoccard}
                  hoverable
                  style={{
                      width: 300,
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",}} >
                <Meta
                    className={styles.card}
                    title={
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {wishes[key].name}
                    </span>
                    }
                /></Card>
            </div>
                      )
                      );
                  }

                      export default Wishlist;