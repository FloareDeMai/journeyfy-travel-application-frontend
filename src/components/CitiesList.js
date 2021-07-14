import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CitiesList(props) {
    const [isLoading, setLoading] = useState(true)
    const [cities, setCities] = useState({})

    useEffect(() => {
        let options = {
            method: 'GET',
            url: 'https://spott.p.rapidapi.com/places',
            params: { limit: '20', country: `${props.location.state}`, skip: '0', type: 'CITY' },
            headers: {
                'x-rapidapi-key': 'de0811151bmsh383915766b8b499p1a2d0cjsn3919d3354914',
                'x-rapidapi-host': 'spott.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response)
            setCities(response.data)
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
        });

    }, [props.location.state])

    if (isLoading) {
        return <p>Loading cities...</p>
    }

    return (
        <div>
            <ul> {cities.map((city) => {
                const urlToActivities = "/activities/" + city.coordinates.latitude + "/" + city.coordinates.longitude
                return (
                    <Link to={{ pathname: urlToActivities, state: { latitude: city.coordinates.latitude, longitude: city.coordinates.longitude } }}>
                        <li>{city.name}</li>
                    </Link>
                )
            })}
            </ul>
        </div>
    )
}

export default CitiesList
