import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

function CountryList() {
  const [countriesList, setCountriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const URL =
    "http://dataservice.accuweather.com/locations/v1/countries/europe?apikey=bs85MbDnRuEE5MGf3EdUAFYSoJxzEJiR&language=en-us";

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

  return <section>{countriesList.map((country) => {
      return (
        <ul key={country.EnglishName}>
          <Link to={`/cities/${countriesList.ID}`}>
            <li>{country.EnglishName}</li>
          </Link>
        </ul>
      );
  })}</section>;
}

export default CountryList;
