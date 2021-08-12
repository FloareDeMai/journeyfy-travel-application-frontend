import React, {useEffect, useState} from 'react'
import Card from "../ui/Card";
import classes from './ActivityList.module.css';
import {atom, useAtom} from "jotai"
import {searchAtom} from "./TopHotels";
import {Link} from "react-router-dom";

export const hotelsToExport = atom([])

function Hotels(props) {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hotelsToExportVar, setHotelsToExport] = useAtom(hotelsToExport)
    const [cityNameParam] = useAtom(searchAtom)
    // let cityNameParam = props.match.params.cityName

    useEffect(() => {
        fetch(`http://localhost:8080/hotels/${cityNameParam}`)
            .then(response => response.json())
            .then(data => {
                setHotels(data)
                setHotelsToExport(data)
                setIsLoading(false)
            })
    }, [cityNameParam, setHotelsToExport]);
    if (isLoading) {
        return "Loading..."
    }
    return (
        <div>
            <ul className={classes.list}>
                {hotels.map(hotel =>
                    <li key={hotel.name} className={classes.content}>
                        <Card>
                            <Link to={{pathname: "/hotel-details", state: {hotel:hotel}}}>
                                <div>
                                    <img className={classes.image} src={hotel.picture} alt={hotel.picture}></img>
                                </div>
                            </Link>
                            <div>
                                <h3>{hotel.name}</h3>
                                <h5>
                                    {hotel.cityName}
                                </h5>
                                <h5>
                    <span>
                      Price: {hotel.price}{" "}{"RON"}
                    </span></h5>
                                <h5>
                                    <span>Rating: {hotel.rating +  "⭐" }</span>
                                </h5>
                            </div>
                        </Card>
                    </li>
                )}
            </ul>

        </div>
    )
}

export default Hotels
