import React, { useState, useEffect } from 'react'
import Amadeus from 'amadeus'
import Activity from './Activity'


function ActivityList(props) {
    const [isLoading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])
    const latitude = props.location.state.latitude
    const longitude = props.location.state.longitude
    console.log(props.location.state)

        useEffect(() => {
            // let coordinates = []
            let amadeus = new Amadeus({
                clientId: 'w8kykE5XDv9K4hd3jNVudmgbIgBRJ3AB',
                clientSecret: 'ceYxykqGW49LQZvH'
            })

            // cities.map((city) => {
            //     const object = {
            //         "latitude": city.coordinates.latitude,
            //         "longitude": city.coordinates.longitude
            //     }
            //     coordinates.push(object)
            // })
            
                amadeus.shopping.activities.get({
                    latitude: {latitude},
                    longitude: {longitude}
                }).then(response => {
                    console.log(response);
                    setLoading(false)
                })
            
        }, [])

    if (isLoading) {
        <p>Loading activities...</p>
    }
    return (
        <div>
            <Activity activities={activities}></Activity>
        </div>
    )
}

export default ActivityList
