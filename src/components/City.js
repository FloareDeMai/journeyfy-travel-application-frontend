import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ActivityList from './ActivityList'
import CityNames from './CityNames'


function City(props) {
    const coordinates = props.cities.map((city) => city.coordinates)
    coordinates.map((city, i) => console.log(city.latitude, city.longitude))
    const cityNames = props.cities.map((city) => <li>{city.name}</li>)

    let urlToActivities = "";
    let latitude = 0;
    let longitude = 0;
    coordinates.map((city, i) => {
        urlToActivities = "/activities/" + city.latitude + "/" + city.longitude 
        latitude = city.latitude
        longitude = city.longitude 
    })
    return (
        <div>
            <ul>
            <Link to={{pathname: urlToActivities, state:{latitude: latitude, longitude: longitude}}}>
                {cityNames}
            </Link>
            </ul>
        </div>
    )
}

export default City
