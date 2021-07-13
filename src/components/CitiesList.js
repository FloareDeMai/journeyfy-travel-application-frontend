import React, { useState, useEffect } from 'react'

function CitiesList(props) {
    const [cities, setCities] = useState({})

    useEffect(() => {
        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://spott.p.rapidapi.com/places',
            params: { limit: '10', country: `${props.location.state}`, skip: '0', type: 'CITY' },
            headers: {
                'x-rapidapi-key': 'de0811151bmsh383915766b8b499p1a2d0cjsn3919d3354914',
                'x-rapidapi-host': 'spott.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        
        console.log(props.location.state);
    }, [props.location.state])

    return (
        <div>

        </div>
    )
}

export default CitiesList
