import React, {useEffect, useState} from "react";
import styles from "./PlacesToStay.module.css";
import {Card} from "antd";
import {Link, useHistory} from "react-router-dom";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import {addToWishlist} from "../components/layout/addToWishlist";
import axios from "axios";

const {Meta} = Card;

function PlacesToStay() {
    let [hotels, setHotels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let [entityId, setEntityId] = useState(null)
    const [lastHotel, setLastHotel] = useState(null);
    let history = useHistory()

    const URL = "http://localhost:8080/hotels/all-hotels";

    useEffect(() => {
        // axios.get(URL, {headers: authHeader()})
        //     .then((data) => {
        //         setHotels(data.data)
        //         setLoading(false)
        //     })
        axios.get(
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
                    'x-rapidapi-key': '76b7ea0a2cmsh053780f28264739p1bc686jsna682c5326e58'
                }
            }).then(data => {
            setHotels(data.data.data)
            console.log(data.data.data)
            setLoading(false)
        })
    }, [entityId])


    const saveToDatabase = async() => {
        let entity = getLastEntity()
        const URL = "http://localhost:8080/hotels/add-hotel"
        await axios.post(URL, entity).then(data => {
            console.log(data)
        })
    }

    const getLastEntity = async() => {
        axios.get("http://localhost:8080/hotels/last")
            .then(res => {
                    console.log(res)
                    setEntityId(res.data.id)
                    return res.data
                })
    }

    useEffect(() => {
        saveToDatabase().then(addToWishlist())
        getLastEntity()
    }, [entityId])



    const handleClickWishIcon = async e => {
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(e.currentTarget.getAttribute('data-entity-name'))

        console.log(entity.name)


        if (user) {
            let wish = {
                'name': e.currentTarget.getAttribute('data-name'),
                'activity_entity_id': entityId,
                'user_id': user.id
            }


            addToWishlist(wish)


        } else {
            history.push("/signin")
        }
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
                                        onClick={handleClickWishIcon}
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
