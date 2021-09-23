import { Autocomplete } from "@react-google-maps/api";
import { CircularProgress, Input, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import styles from "./PlacesToStay.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import { getPlacesDataByLatAndLng } from "../components/map/api/getDataAPI";
import { Card } from "antd";
import {Link, useHistory} from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";

const { Meta } = Card;

function TestingPlaces() {
  const [coordinates, setCoordinates] = useState({});
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("near you");

  const user = JSON.parse(localStorage.getItem('user'))
  let history = useHistory()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getPlacesDataByLatAndLng("attractions", coordinates).then((data) => {
      setPlaces(
        data?.filter(
          (place) =>
            place.name &&
            place.num_reviews > 0 &&
            place.address_obj !== "" &&
            place.rating
        )
      );
      setIsLoading(false);
    });
  }, [coordinates]);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  const saveToDatabase = async (e) => {

    let entity = {
      'name': e.name,
      'rating': parseFloat(e.rating),
      'pictureLink': e.photo?.images.large.url ? e.photo.images.large.url : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg",
      'id': e.location_id,
      'cityName': e.ranking_geo,
      'activityType': 'ACTIVITY'
    }

    const URL = "http://localhost:8080/activities/add-activity"
    const response = await axios.post(URL, entity)
    console.log(response)
    console.log(entity)
  }

  const addToWish = async (e) => {
    let wish = {
      'name': e.name,
      'activity_entity_id': e.location_id,
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
    }
    else {
      history.push("/signin")
    }

  }

  console.log(places)
  return (
    <div>
      <h1 className={styles.title}>Explore top attractions </h1>
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div>
            <div className={styles.searchBarContainer}>
              <Input
                placeholder={"Enter a city..."}
                className={styles.searchBar}
              />
              {/* <Input onChange={(newValue) => setLocation("in " + newValue.target.value)} className={styles.searchBar} /> */}
            </div>
          </div>
        </Autocomplete>
      </div>

      <div className={styles.container}>
        <BreadcrumbHistory
          name="about"
          times={{
            pages: [{ name: "things to do", link: "" }],
          }}
        />
        {isLoading ? (
          <CircularProgress
            style={{ color: "rgb(34, 177, 170)" }}
            size="5rem"
          />
        ) : (
          <div className={styles.container2}>
            {places?.length > 0 ? (
              places.map((attraction) => {
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
                          key={attraction.name}
                          to={{
                            pathname: `/activity-details/${attraction.name}`,
                            state: { attraction: attraction },
                          }}
                        >
                          <img
                            className={styles.cardImage}
                            alt={attraction.name}
                            src={
                              attraction.photo
                                ? attraction.photo.images.large.url
                                : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"
                            }
                          />
                        </Link>
                        <svg
                          data-name={attraction.name}
                          data-id={attraction.id}
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="white"
                          className={styles.wishIcon}
                          viewBox="0 0 16 16"
                          onClick={async (event) => {
                            // await handleClickWishIcon(event)
                            await handleClickWishIcon(attraction)

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
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                          {attraction.name}
                        </span>
                      }
                    />
                    <br></br>
                    <h3>
                      <span>
                        {attraction.rating
                          ? Number(attraction.rating).toFixed(2) + "⭐"
                          : "No rating yet"}{" "}
                      </span>
                    </h3>
                  </Card>
                );
              })
            ) : (
              <p>NO ATTRACTION WAS FOUND</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TestingPlaces;
