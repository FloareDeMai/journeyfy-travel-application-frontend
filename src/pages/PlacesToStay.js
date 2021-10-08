import {Autocomplete} from "@react-google-maps/api";
import {CircularProgress, Input} from "@material-ui/core";
import React, {useState, useEffect} from "react";
import SearchBar from "material-ui-search-bar";
import styles from "./PlacesToStay.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import {getPlacesData} from "../components/map/api/getDataAPI";
import {Card} from "antd";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const {Meta} = Card;

function TestingPlaces() {

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [places, setPlaces] = useState([]);

    const [autocomplete, setAutocomplete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'))
    let history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                setCoordinates({lat: latitude, lng: longitude});
            }
        );
    }, []);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);

            getPlacesData("hotels", bounds).then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setIsLoading(false);
            });
        }
    }, [bounds]);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat, lng});
    };

    useEffect(() => {
        setBounds({
            ne: {lat: coordinates.lat + 0.01, lng: coordinates.lng + 0.01},
            sw: {lat: coordinates.lat - 0.01, lng: coordinates.lng - 0.01},
        });
    }, [coordinates]);

    console.log(coordinates);
    console.log(bounds);
    console.log(places)


    const saveToDatabase = async (e) => {
        let entity = {
            'name': e.name,
            'rating': parseFloat(e.rating),
            'price': parseFloat(e.price?.slice(1, 3).trim()),
            'hotelClass': e.hotel_class,
            'pictureLink': e.photo?.images.large.url ? e.photo.images.large.url : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg",
            'id': e.name,
            'cityName': e.ranking_geo,
            'activityType': 'HOTEL'
        }

        const URL = "http://localhost:8080/hotels/add-hotel"
        const response = await axios.post(URL, entity)
        console.log(response)
        console.log(entity)
    }

    //TODO refactor wish function
    const addToWish = async (e) => {
        let wish = {
            'name': e.name,
            'activity_entity_id': e.name,
            'user_id': user.id
        }

        const URL = "http://localhost:8080/wish-list/add-wish"
        const response = await axios.post(URL, wish)
        console.log(response)
    }

    const handleClickWishIcon = async (e) => {
        if(user) {
            await saveToDatabase(e)
            await addToWish(e)
        } else {
            history.push("/signin")
        }

    }

    return (
        <div>
            <h1 className={styles.title}>Where do you want to stay .. ?</h1>
            <div>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div>
                        <div className={styles.searchBarContainer}>
                            <Input placeholder={"Enter a city..."} className={styles.searchBar}/></div>
                    </div>
                </Autocomplete>
            </div>

            <div className={styles.container}>
                <BreadcrumbHistory
                    name="about"
                    times={{
                        pages: [{name: "places to stay", link: ""}],
                    }}
                />
                {isLoading ? (
                    <CircularProgress
                        style={{color: "rgb(34, 177, 170)"}}
                        size="5rem"
                    />
                ) : (
                    <div className={styles.container2}>
                        {places?.length > 0 ? (
                            places.map((hotel) => {
                                return <Card
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
                                                    src={hotel.photo ? hotel.photo.images.large.url : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"}
                                                />
                                            </Link>
                                            <svg
                                                data-entity-name={hotel.name ? hotel.name : ""}
                                                data-price={hotel.price ? hotel.price : ""}
                                                data-rating={hotel.rating ? hotel.rating : ""}
                                                data-hotel-class={hotel.hotel_class ? hotel.hotel_class : ""}
                                                data-listing-key={hotel.listing_key}
                                                data-city-name={hotel.ranking_geo}
                                                data-picture={
                                                    hotel.photo
                                                        ? hotel.photo.images.large.url
                                                        : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"
                                                }
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="25"
                                                fill="white"
                                                className={styles.wishIcon}
                                                viewBox="0 0 16 16"
                                                onClick={async (event) => {
                                                    // await handleClickWishIcon(event)
                                                    await handleClickWishIcon(hotel)

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
                                            <span style={{fontSize: "20px", fontWeight: "bold"}}>
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
                            })
                        ) : (
                            <p>NO HOTEL WAS FOUND</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestingPlaces;
