import React from "react";
import { Link } from "react-router-dom";

function Club(props) {
  let club = props.location.state;

  console.log(club);
  return (
    <div>
      <div>
        <h2>{club.club.name}</h2>
        <img src={club.club.pictureLink} alt="" />
        <p>{club.club.description}</p>
        <Link
          to={{ pathname: club.club.siteLink }}
          target="blank"
          style={{ color: "black" }}
        >
          Link to site <span>&#8599;</span>
        </Link>
      </div>
    </div>
  );
}

export default Club;
