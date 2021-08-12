import React from "react";
import { Link } from "react-router-dom";

function ActivityFromApi(props) {
  let activity = props.location.state;
  console.log(activity);
  return (
    <div>
      <div>
        <h2>{activity.activity.name}</h2>
        <img src={activity.activity.pictures[0]} alt="" />
        <p>{activity.activity.shortDescription}</p>
        <h5>
          <span>
            Price: {activity.activity.price.amount} {activity.activity.price.currencyCode}
          </span>
        </h5>
        <h5>
          <span>
            Rating:{" "}
            {activity.activity.rating
              ? Number(activity.activity.rating).toFixed(2) + "⭐"
              : "No rating yet"}{" "}
          </span>
        </h5>
        <Link
          to={{ pathname: activity.activity.bookingLink }}
          target="blank"
          style={{ color: "black" }}
        >
          Booking Link <span>&#8599;</span>
        </Link>
      </div>
    </div>
  );
}

export default ActivityFromApi;
