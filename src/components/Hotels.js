import React, {useEffect, useState} from 'react'
import Card from "../ui/Card";
import classes from './CountryList.module.css';
import {atom, useAtom} from "jotai"
import {searchAtom} from "./TopHotels";

export const hotelsToExport = atom([])

function Hotels(props) {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hotelsToExportVar, setHotelsToExport] = useAtom(hotelsToExport)
    const [cityNameParam] = useAtom(searchAtom)
    // let cityNameParam = props.match.params.cityName

    useEffect(() => {
        fetch(`http://localhost:8080/hotels/${cityNameParam}`)
            .then(response => response.json())
            .then(data => {
                setHotels(data)
                setHotelsToExport(data)
                setIsLoading(false)
            })
    }, [cityNameParam, setHotelsToExport]);
    if (isLoading) {
        return "Loading..."
    }
    return (
        <div>
            <ul className={classes.list}>
                {hotels.map(hotel =>
                    <Card>
                        <li className={classes.cityName}><h3>{hotel.name}</h3></li>
                    </Card>
                )}
            </ul>

        </div>
    )
}

export default Hotels
