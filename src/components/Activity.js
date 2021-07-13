import React from 'react'

function Activity(props) {
    let activities = props.activities
    
    return (
         
    <div>
        {activities.map((activity) => <li>{activity.name}</li>)}
    </div>
        
    )
}

export default Activity
