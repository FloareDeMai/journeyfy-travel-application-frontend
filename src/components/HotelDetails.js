import Card from "../ui/Card";
import classes from "./CountryList.module.css";
import React from "react";
import {Link} from "react-router-dom";


function HotelDetails(props) {
    console.log(props.location.state.hotel)
    let hotel = props.location.state.hotel
    return (
        <div>
            <Card>
                <img  width="840" height="450" src={hotel.picture} alt={hotel.picture}></img>
                <div>
                    <h3>{hotel.name}</h3>
                </div>
                <div>
                    <h5>
                    <span>
                      Location: {hotel.cityName}
                    </span>
                    </h5>
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
                        <span>Rating: {hotel.rating + "⭐"}</span>
                    </h5>
                    <h5>
                        <span>Hotel class: {hotel.hotelClass}</span>
                    </h5>
                    <Link to={{pathname: hotel.siteAddress}} target="blank"
                          style={{color: "black"}}>Link to hotel <span>&#8599;</span></Link>
                </div>
            </Card>

        </div>
    )
}

export default HotelDetails