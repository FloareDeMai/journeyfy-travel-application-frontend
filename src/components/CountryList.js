import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function CountryList() {

    const [countriesList, setCountriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const URL =
        "https://restcountries.eu/rest/v2/region/europe";

    useEffect(() => {
        axios.get(URL).then((response) => {
            console.log(response.data);
            setCountriesList(response.data);
            setIsLoading(false);
        });
    }, []);


    if (isLoading) {
        return <p>Loading...</p>;
    }


    return <section>
        <ul>{countriesList.map((country) => {
            const urlToCities = "/cities/" + country.alpha2Code
            return (
                <Link to={{ pathname: urlToCities, state: country.alpha2Code }}>
                    <li key={country.name}>{country.name}</li>
                </Link>
            );
        })}</ul></section>;

}

export default CountryList;
