import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Activity.module.css";


function Activity(props) {
  let activity = props.location.state;
  let history = useHistory();

  return (
    <div>
      <div>
        <h2>{activity.activity.name}</h2>
        <img width="100%" height="100%" src={activity.activity.pictureLink} alt="" />
        <p>{activity.activity.description}</p>
      </div>
      <div>
        <button className={classes.button}  onClick={()=> history.goBack()}>BACK</button>
      </div>
    </div>
  );
}

export default Activity;