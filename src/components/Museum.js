import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Museum.module.css";

function Museum(props) {
  let museum = props.location.state;
  let history = useHistory();
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
      <div>
        <button className={classes.button}  onClick={()=> history.goBack()}>BACK</button>
      </div>
    </div>
  );
}

export default Museum;