import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ActivityList from './ActivityList'
import CityNames from './CityNames'
import Card from '../ui/Card'
import classes from "./CitiesList.module.css";


function City(props) {
    const coordinates = props.cities.map((city) => city.coordinates)
    coordinates.map((city, i) => console.log(city.latitude, city.longitude))
    const cityNames = props.cities.map((city) => city.name)
    const filteredCities = cityNames.filter((city) => !city.includes("Sector"))
    
    let urlToActivities = "";
    let latitude = 0;
    let longitude = 0;
    coordinates.map((city, i) => {
        urlToActivities = "/activities/" + city.latitude + "/" + city.longitude
        latitude = city.latitude
        longitude = city.longitude
    })
    console.log(filteredCities)
    return (
      <div>
        <ul className={classes.list}>
          {filteredCities.map((city) => {
            return (
              <Card>
                <Link
                  to={{
                    pathname: urlToActivities,
                    state: { latitude: latitude, longitude: longitude },
                  }}
                >
                  <li>{city}</li>
                </Link>
              </Card>
            );
          })}
        </ul>
      </div>
    );
}

export default City
