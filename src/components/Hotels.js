import React, {useEffect, useState} from 'react'
import Card from "../ui/Card";
import classes from './CountryList.module.css';

function Hotels(props) {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let cityNameParam = props.match.params.cityName
    useEffect(() => {
        fetch(`http://localhost:8080/hotels/${cityNameParam}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setHotels(data)
                setIsLoading(false)
            })
    }, [cityNameParam]);
    if (isLoading) {
        return "Loading..."
    }
    return (
        <div>
            <ul className={classes.list}>
                {hotels.map(hotel =>

                    <Card>
                        <li className={classes.cityName}><h3>{hotel.name}</h3></li>
                    </Card>

                )}
            </ul>

        </div>
    )
}

export default Hotels
