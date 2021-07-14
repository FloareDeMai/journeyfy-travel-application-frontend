import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Amadeus from 'amadeus'
import ActivityList from './ActivityList'
import CityNames from './CityNames'

function City(props) {
    const [isLoading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])
    const [activitiesNames, setActivitiesNames] = useState([])
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])

    const coordinates = props.cities.map((city) => city.coordinates)
    // coordinates.map((city, i) => console.log(city.latitude, city.longitude))
    const cityNames = props.cities.map((city) => city.name)
    const filteredCities = cityNames.filter((city) => !city.includes("Sector"))

    useEffect(() => {
        let amadeus = new Amadeus({
            clientId: 'gfuLA4rbE3NLFR3hEp1lSUEAgeWWcR6b',
            clientSecret: 'WuPTFB32DJbLgmP7'
        })

        coordinates.map((coord, i) => {
            setLatitude(coord.latitude)
            setLongitude(coord.longitude)
            console.log(latitude)
            amadeus.shopping.activities.get({
                latitude: latitude,
                longitude: longitude
            }).then(response => {
                setActivities(response.data)
                console.log(response.data)
                setLoading(false)
            })
            let activityName = ""
            let activitiesListNames = []

            activities.forEach((el, i, arr) => {
                activityName = el.name
                activitiesListNames.push(activityName)
            })
            setActivitiesNames(activitiesListNames)
        }
        )
        
    }, [])
    let url = `/activities/${latitude}/${longitude}`
    if (isLoading) {
        <p>Loading...</p>
    }
    return (
        <div>
            {filteredCities.map((city) => {
                return <Link to={{ pathname: url, state: activitiesNames }}>
                    <li>{city}</li> </Link>
            })})
        </div>
    )
}

export default City
