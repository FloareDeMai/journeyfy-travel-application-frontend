import React, { useState, useEffect } from 'react'
import Activity from './Activity'


function ActivityList(props) {
    const [isLoading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])
    const [isLoadingNames, setLoadingNames] = useState(true)
    const [activitiesNames, setActivitiesNames] = useState([])
    const latitude = props.location.state.latitude
    const longitude = props.location.state.longitude
 
   

    if (isLoading && isLoadingNames) {
        <p>Loading activities...</p>
    }
    return (
        <div>
            <div>
            {activitiesNames.map((act) => <li>{act}</li>)}
            </div>
        </div>
    )
}

export default ActivityList
