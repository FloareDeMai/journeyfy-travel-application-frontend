import React, {useEffect, useRef, useState} from "react";
import styles from "./PlacesToStay.module.css";
import {Card} from "antd";
import {Link, useHistory} from "react-router-dom";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import {addToWishlist} from "../components/layout/addToWishlist";
import axios from "axios";

const {Meta} = Card;

function PlacesToStay() {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [entity, setEntity] = useState(null)
    const [lastHotel, setLastHotel] = useState(null);
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('user'))

    const URL = "http://localhost:8080/hotels/all-hotels";

    useEffect(() => {
        // axios.get(URL, {headers: authHeader()})
        //     .then((data) => {
        //         setHotels(data.data)
        //         setLoading(false)
        //     })
        async function fetchData() {
            const response = await axios.get(
                `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary`, {
                    params: {
                        bl_latitude: '52.520008',
                        bl_longitude: '13.404954',
                        tr_longitude: '139.149359',
                        tr_latitude: '10.838442',
                        limit: '30',
                    },
                    headers: {
                        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                        'x-rapidapi-key': '5a6124cfb2msh9362155c4703c7cp1adf25jsn6217f18237e0'
                    }
                })
                const data = await response.data.data
                setHotels(data)
                console.log(data)
                setLoading(false)
        }
        fetchData()
    }, [])


    const saveToDatabase = (e) => {
        let entity = {
            'name' : e.currentTarget.getAttribute('data-entity-name'),
            'rating' : parseFloat(e.currentTarget.dataset.rating),
            'price' : parseFloat(e.currentTarget.dataset.price.slice(1, 3).trim()),
            'hotelClass' : e.currentTarget.dataset.hotelClass,
            'pictureLink' : e.currentTarget.dataset.pictureLink,
            'id' : e.currentTarget.dataset.listingKey,
            'cityName' : 'Bucharest',
            'activityType' : 'HOTEL'
        }

        const URL = "http://localhost:8080/hotels/add-hotel"
         const response = axios.post(URL, entity)
        console.log(response)
        console.log(entity)
    }


    // const getLastEntity = async () => {
    //     const response = await axios.get("http://localhost:8080/hotels/last")
    //     setEntity(response?.data.id)
    //     console.log(response.data.id)
    // }


    const addToWish = (e) => {
        let wish = {
            'name': e.currentTarget.getAttribute('data-entity-name'),
            'activity_entity_id': e.currentTarget?.dataset.listingKey,
            'user_id': user.id
        }

        const URL = "http://localhost:8080/wish-list/add-wish"
        const response = axios.post(URL, wish)
        console.log(response)
    }


    const handleClickWishIcon = (e) => {
        saveToDatabase(e)
        addToWish(e)

    }

    if (isLoading) {
        return (
            <div className={styles.containerLoading}>
                <div className={styles.ldsellipsis}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={styles.title}>Where do you want to stay .. ?</h1>
            <div className={styles.container}>
                <BreadcrumbHistory
                    name="about"
                    times={{
                        pages: [{name: "places to stay", link: ""}],
                    }}
                />

                {hotels.map((hotel) => {
                    return (
                        <Card
                            className={styles.hozoccard}
                            hoverable
                            style={{
                                width: 300,
                                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                            }}
                            cover={
                                <div>
                                    <Link
                                        key={hotel.name}
                                        to={{
                                            pathname: `/places-to-stay/${hotel.name}`,
                                            state: {hotel: hotel},
                                        }}
                                    >
                                        <img
                                            className={styles.cardImage}
                                            alt={hotel.name}
                                            src={
                                                hotel.photo
                                                    ? hotel.photo.images.large.url
                                                    : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"
                                            }
                                        />
                                    </Link>
                                    <svg
                                        data-entity-name={hotel.name ? hotel.name : ""}
                                        data-price={hotel.price ? hotel.price : ""}
                                        data-rating={hotel.rating ? hotel.rating : ""}
                                        data-hotel-class={hotel.hotel_class ? hotel.hotel_class : ""}
                                        data-listing-key={hotel.listing_key}
                                        data-picture={
                                            hotel.photo
                                                ? hotel.photo.images.large.url
                                                : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"
                                        }
                                        // data-id={hotel.id}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill="white"
                                        className={styles.wishIcon}
                                        viewBox="0 0 16 16"
                                        onClick={(event) => {
                                            handleClickWishIcon(event)

                                        }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                        />
                                    </svg>
                                </div>
                            }
                        >
                            <Meta
                                className={styles.card}
                                title={
                                    <span data-entity-name={hotel.name} style={{fontSize: "20px", fontWeight: "bold"}}>
                      {hotel.name}
                    </span>
                                }
                            />
                            <h3 className={styles.text}>
                  <span>
                    <small style={{fontSize: "20px"}}>
                      Price: {hotel.price} EUR
                    </small>
                  </span>
                            </h3>
                            <h3>
                  <span>
                    {hotel.rating
                        ? Number(hotel.rating).toFixed(2) + "⭐"
                        : "No rating yet"}{" "}
                  </span>
                            </h3>
                        </Card>

                    );
                })}
            </div>
        </div>
    );
}

export default PlacesToStay;
