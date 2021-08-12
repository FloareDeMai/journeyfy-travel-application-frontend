import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Club.module.css";

function Club(props) {
  let club = props.location.state;
  let history = useHistory();
  return (
    <div>
      <div>
        <div>
          <h2>{club.club.name}</h2>
          <img width="100%" height="100%" src={club.club.pictureLink} alt="" />
          <div>
            <h5>
              <span>Address: {club.club.address}</span>
            </h5>
          </div>
          <p>{club.club.description}</p>
          <h5>
            <span>Rating: {club.club.rating + "⭐"}</span>
          </h5>
        </div>
      </div>
      <div>
        <button className={classes.button}  onClick={()=> history.goBack()}>BACK</button>
      </div>
    </div>
  );
}

export default Club;
