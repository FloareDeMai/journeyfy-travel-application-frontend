import Card from "../ui/Card";
import classes from "./CountryList.module.css";
import React from "react";


function HotelDetails(props) {
    console.log(props.location.state.hotel)
    let hotel = props.location.state.hotel
    return (
        <div>
            <Card>
                <div>
                    <img className={classes.image} src={hotel.picture} alt={hotel.picture}></img>
                </div>
                <div>
                    <h3>{hotel.name}</h3>
                </div>
                <div>
                    <h5>{hotel.description}</h5>
                </div>
                <div>
                    <h5>
                    <span>
                      Price: {hotel.price}{" "}{"RON"}
                    </span>
                    </h5>
                    <h5>
                        <span>Rating: {hotel.rating +  "⭐" }</span>
                    </h5>
                    <h5>
                        <span>Hotel class: {hotel.hotelClass}</span>
                    </h5>
                    <a href={hotel.siteAddress}>Hotel site address</a>
                </div>
            </Card>

        </div>
    )
}

export default HotelDetails