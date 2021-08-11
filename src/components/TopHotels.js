import React, {useEffect, useState} from "react";
import classes from "./CountryList.module.css";
import Card from "../ui/Card";
import {atom, useAtom} from 'jotai';
import {Link} from "react-router-dom";


export const searchAtom = atom('');

function TopHotels() {
    const [topHotels, setTopHotels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let [search, setSearch] = useAtom(searchAtom);
    const handleChange = event => setSearch(event.target.value);

    useEffect(() => {
        fetch("http://localhost:8080/hotels/top-hotels")
            .then(res => res.json())
            .then(data => {
                setTopHotels(data)
                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return "Loading..."
    }

    let path = "/hotels/" + search
    return (
        <div>
            <div className={classes.searchDiv}>
                <input className={classes.search} type="text" placeholder="Search for a city" value={search} onChange={handleChange}/>
                <Link to={{pathname: path}} className={classes.buttonSearch}>search</Link>
            </div>
            <ul className={classes.list}>
                {topHotels.map(hotel =>
                    <li className={classes.content}>
                    <Card>
                        <Link to={{pathname: "/hotel-details", state: {hotel:hotel}}}>
                        <div>
                            <img className={classes.image} src={hotel.picture} alt={hotel.picture}></img>
                        </div>
                        </Link>
                        <div>
                            <h3>{hotel.name}</h3>
                            <h5>
                                <span>Rating: {hotel.rating +  "⭐" }</span>
                            </h5>
                        </div>
                    </Card>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default TopHotels;