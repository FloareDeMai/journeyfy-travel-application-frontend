import React, { useState, useEffect } from 'react'
import Amadeus from 'amadeus'
import classes from "./CitiesList.module.css";
import Card from "../ui/Card"

function ActivityList(props) {
    const [isLoading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])

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

    if (isLoading) {
        <p>Loading activities...</p>
    }
    return (
        <div>
            <ul className={classes.list}>
                {activities.length > 0 ? (activities.map((activity) =>
                    <Card><li>{activity.name}</li></Card>)) : (<li>No activities yet...</li>)}
            </ul>
        </div>
    )
}

export default ActivityList
