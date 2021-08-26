import React from "react";
import styles from "./HotelDetails.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import { Rate } from "antd";

function ClubDetails(props) {
    console.log(props.location.state.club.cityName);

    console.log(props.location.state);

    return (
        <div>
            <BreadcrumbHistory
                name="about"
                times={{
                    pages: [
                        { name: "things to do", link: "/things-to-do" },
                        {name:props.location.state.club.name,
                            link: "",
                        },
                    ],
                }}
            />
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <div className={styles.title}>
                        <h1>{props.location.state.club.name}</h1>
                    </div>
                    <div className={styles.rating}>
                        <Rate
                            disabled
                            allowHalf
                            defaultValue={
                                Math.round(props.location.state.club.rating * 100) / 100
                            }
                        />
                        {Math.round(props.location.state.club.rating * 100) / 100}
                    </div>

                </div>
                <div className={styles.containerPhoto}>
                    <div className={styles.topComments}>
                        <h2>What people are saying:</h2>{" "}
                    </div>
                    <div className={styles.picture}>
                        <img
                            style={{ width: "100%" }}
                            src={props.location.state.club.pictureLink}
                            alt={props.location.state.club.name}
                        ></img>
                    </div>
                </div>
                <div className={styles.containerMap}>
                    <div className={styles.locationDescription}>
                        <h3>{props.location.state.club.description}</h3>
                    </div>
                   <h4>Club address:</h4>
                </div>
                <div className={styles.containerMap}>
                    <div className={styles.locationDescription}>
                        <h3>{props.location.state.club.address}</h3>
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

export default ClubDetails;
