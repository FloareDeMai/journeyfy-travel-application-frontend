import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Card from "../ui/Card";
import classes from './CountryList.module.css';
import CountryImage from "./CountryImage";

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


    return (
        <ul className={classes.list}>{countriesList.map((country) => {
            const urlToCities = "/cities/" + country.alpha2Code;
            const countryCode = country.alpha3Code.toLowerCase();
            return (
              <Link to={{ pathname: urlToCities, state: country.alpha2Code }}>
                <li className={classes.content}>
                  <Card>
                    <div className={classes.image}>
                      <CountryImage image={countryCode}></CountryImage>
                    </div>

                    <div className={classes.content}>
                      <h3>{country.name}</h3>
                    </div>
                  </Card>
                </li>
              </Link>
            );
        })}</ul>  );

}

export default CountryList;
