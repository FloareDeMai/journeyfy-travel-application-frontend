import React from 'react'

function City(props) {
    const cityNames = props.cities.map((city) => city.name)
    const filteredCities = cityNames.filter((city) => !city.includes("Sector"))

    return (
        <div>
            <ul>
                {filteredCities.map((city) => <li key={city}>{city}</li>)}
            </ul>
        </div>
    )
}

export default City
