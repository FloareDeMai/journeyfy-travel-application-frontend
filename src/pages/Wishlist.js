import {React, useEffect, useState} from "react";
import {fetchUser} from "../components/layout/fetchUser";
import {Card} from "antd";
import styles from "./PlacesToStay.module.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import {useHistory} from "react-router-dom";

const {Meta} = Card;

function Wishlist() {
    const [wishes, setWishes] = useState({});
    let userForFetch = JSON.parse(localStorage.getItem("user"));
    let history = useHistory();



    useEffect(() => {
        if(userForFetch) {
            fetch(`http://localhost:8080/wish-list/all-wishes/${userForFetch.id}`)
                .then((response) => response.json())
                .then((data) => setWishes(data));
        } else {
            history.push("/signin")
        }
    }, [userForFetch?.id]);

    const handleDeleteWish = (id) => {
        let stringId = id.toString()
        axios
            .delete(`http://localhost:8080/wish-list/remove/${stringId}/${userForFetch.id}`)
        const newWishes = wishes.filter((wishFiltered) => wishFiltered.entity.id !== id)
        setWishes(newWishes)
    };
    console.log(wishes)
    return (
        <div>
            {userForFetch ? (<div className={styles.container}>
                {Object.keys(wishes).map((key) => {
                    return (
                        <Card
                            key={wishes[key].id}
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
                                    <div className={styles.circle}></div>
                                    <DeleteForeverIcon
                                        data-id={wishes[key].id}
                                        className={styles.deleteButton}
                                        style={{
                                            color: "rgb(34, 177, 170)",
                                            height: "30px",
                                            width: "30px",
                                        }}
                                        onClick={() => handleDeleteWish(wishes[key].entity.id)}
                                    />
                                </div>
                            }
                        >
                            <Meta
                                className={styles.card}
                                title={
                                    <span style={{fontSize: "20px", fontWeight: "bold"}}>
                    {wishes[key].name}
                  </span>
                                }
                            />
                            <h3 className={styles.text}>
                <span>
                  <small style={{fontSize: "20px"}}>
                    Price: {wishes[key].entity.price} EUR
                  </small>
                </span>
                            </h3>
                            <h3>
                <span>
                  {wishes[key].entity.rating
                      ? Number(wishes[key].entity.rating).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                </span>
                            </h3>
                        </Card>
                    );
                })}
            </div>) : (history.push("/signin"))}
        </div>
    );
}

export default Wishlist;
