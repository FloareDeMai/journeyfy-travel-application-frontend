import React from "react";
import { Link } from "react-router-dom";

function Museum(props) {
  let museum = props.location.state;
  console.log(museum);
  return (
    <div>
      <div>
        <h2>{museum.museum.name}</h2>
        <img src={museum.museum.pictureLink} alt="" />
        <p>{museum.museum.description}</p>
        <Link
          to={{ pathname: museum.museum.siteLink }}
          target="blank"
          style={{ color: "black" }}
        >
          Link to site <span>&#8599;</span>
        </Link>
      </div>
    </div>
  );
}

export default Museum;
