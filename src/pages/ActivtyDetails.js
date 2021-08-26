import React from "react";
import styles from "./HotelDetails.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import { Rate } from "antd";

function ActivityDetails(props) {
    let activity = props.location.state.activity
    console.log(activity)

    return (
        <div>
            <BreadcrumbHistory
                name="about"
                times={{
                    pages: [
                        { name: "things to do", link: "/things-to-do" },
                        {name:activity.name,
                            link: "",
                        },
                    ],
                }}
            />
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <div className={styles.title}>
                        <h1>{activity.name}</h1>
                    </div>
                    <div className={styles.rating}>
                        <Rate
                            disabled
                            allowHalf
                            defaultValue={
                                Math.round(activity.rating * 100) / 100
                            }
                        />
                        {Math.round(activity.rating * 100) / 100} • PRET
                       {" "} {activity.price} €

                    </div>

                </div>
                <div className={styles.containerPhoto}>
                    <div className={styles.topComments}>
                        <h2>What people are saying:</h2>{" "}
                    </div>
                    <div className={styles.picture}>
                        <img
                            style={{ width: "100%" }}
                            src={activity.pictureLink}
                            alt={activity.name}
                        ></img>
                    </div>
                </div>
                <div className={styles.containerMap}>
                    <div className={styles.locationDescription}>
                        <h3>{activity.description}</h3>
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

export default ActivityDetails;
