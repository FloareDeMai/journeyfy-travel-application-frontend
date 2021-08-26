import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./HotelDetails.module.css";

function HotelDetails(props) {
  console.log(props.location.state.hotel);
  let hotel = props.location.state.hotel;
  let history = useHistory();

  return (
    <div>
      <div>
        <h2>{hotel.name}</h2>
        <img
          width="100%"
          height="100%"
          src={hotel.pictureLink}
          alt={hotel.pictureLink}
        ></img>
      </div>
      <div>
        <h5>
          <span>Location: {hotel.cityName}</span>
        </h5>
      </div>
      <div>
        <p>{hotel.description}</p>
      </div>
      <div>
        <h5>
          <span>
            Price: {hotel.price} {"RON"}
          </span>
        </h5>
        <h5>
          <span>Rating: {hotel.rating + "⭐"}</span>
        </h5>
        <h5>
          <span>Hotel class: {hotel.hotelClass}</span>
        </h5>
        <Link
          to={{ pathname: hotel.siteAddress }}
          target="blank"
          style={{ color: "black" }}
        >
          Link to hotel <span>&#8599;</span>
        </Link>
      </div>
      <div>
        <button className={classes.button} onClick={() => history.goBack()}>
          BACK
        </button>
      </div>
    </div>
  );
}

export default HotelDetails;
