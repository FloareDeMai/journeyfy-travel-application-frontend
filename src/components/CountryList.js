import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Card from "../ui/Card";
import classes from './CountryList.module.css';
import CountryImage from "./CountryImage";
import { atom, useAtom } from 'jotai';

const searchAtom = atom('');

function CountryList() {

    let [countriesList, setCountriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useAtom(searchAtom);
    const handleChange = event => setSearch(event.target.value.toLowerCase());

    const URL =
        "https://restcountries.eu/rest/v2/region/europe";

    useEffect(() => {
        axios.get(URL).then((response) => {
            setCountriesList(response.data);
            setIsLoading(false);
        });
    }, []);

    let countriesAfterSearch = countriesList.filter((country) => {
        return country.name.toLowerCase().includes(search)
    })

    if (search.length >= 1) {
        countriesList = countriesAfterSearch
    }
    
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>

            <div className={classes.searchDiv}>
                <input className={classes.search} type="text" placeholder="Search for a country" value={search} onChange={handleChange} />
            </div>
            <ul className={classes.list}>
            {countriesList.map((country) => {
                const urlToCities = "/cities/" + country.alpha2Code;
                const countryCode = country.alpha3Code.toLowerCase();
                return (
                    <Link to={{ pathname: urlToCities, state: country.alpha2Code }}>
                        <li className={classes.content}>
                            <Card>
                                <div className={classes.image}>
                                    <CountryImage image={countryCode}>
                                    </CountryImage>
                                </div>
                                <div className={classes.content}>
                                    <h3>{country.name}</h3>
                                </div>
                            </Card>
                        </li>
                    </Link>
                );
            })}</ul>
        </div>
    );
}

export default CountryList;
