import React, { useState, useEffect } from 'react'
import Activity from './Activity'

import Amadeus from 'amadeus'

function ActivityList(props) {
    const [isLoading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])
    const [isLoadingNames, setLoadingNames] = useState(true)
    const [activitiesNames, setActivitiesNames] = useState([])
 
    useEffect(() => {
        console.log(props)
        let amadeus = new Amadeus({
            clientId: 'gfuLA4rbE3NLFR3hEp1lSUEAgeWWcR6b',
            clientSecret: 'WuPTFB32DJbLgmP7'
        })

        amadeus.shopping.activities.get({
            latitude: props.location.state.latitude,
            longitude: props.location.state.longitude
        }).then(response => {
            console.log(response.data)
            setActivities(response.data)
            setLoading(false)
        })
    }, [])

    if (isLoading && isLoadingNames) {
        <p>Loading activities...</p>
    }
    return (
        <div>
            {activities.map((activity) => <li>{activity.name}</li>)}
        </div>
    )
}

export default ActivityList
