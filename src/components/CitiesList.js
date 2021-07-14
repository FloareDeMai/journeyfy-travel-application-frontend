import React, { useState, useEffect } from 'react'
import CityNames from './CityNames';
import City from './City';
import axios from 'axios'


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
        {/* <CityNames citiesNames={cities}></CityNames> */}
        
          <City cities={cities}></City>
       
      </div>
    );
}

export default CitiesList
