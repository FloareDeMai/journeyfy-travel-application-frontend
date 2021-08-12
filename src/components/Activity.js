import React from "react";
import { Link } from "react-router-dom";

function Activity(props) {
  let activity = props.location.state;
  
  return (
    <div>
      <div>
        <h2>{activity.activity.name}</h2>
        <img src={activity.activity.pictureLink} alt="" />
        <p>{activity.activity.description}</p>
        <Link
          to={{ pathname: activity.activity.siteLink }}
          target="blank"
          style={{ color: "black" }}
        >
          Link to site <span>&#8599;</span>
        </Link>
      </div>
    </div>
  );
}

export default Activity;