import styles from "./Cities.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "antd";
import BreadcrumbHistory from '../components/layout/BreadcrumbHistory'

const { Meta } = Card;

function Cities(props) {
  const [isLoading, setLoading] = useState(true);
  let [cities, setCities] = useState();
  console.log(props)

  useEffect(() => {
    let options = {
      method: "GET",
      url: "https://spott.p.rapidapi.com/places",
      params: {
        limit: "20",
        country: `${props.location.state}`,
        skip: "0",
        type: "CITY",
      },
      headers: {
        "x-rapidapi-key": "de0811151bmsh383915766b8b499p1a2d0cjsn3919d3354914",
        "x-rapidapi-host": "spott.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCities(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [props.location.state]);

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
    <div className={styles.container}>
      <BreadcrumbHistory name="about" times={{"pages" : [
                                                      {"name":"explore", "link":'/explore'},
                                                      {"name":"cities", "link":""},
                                                      ]}} />
        {cities.map((city) => {
          const urlToActivities =
            "/activities/" +
            city.coordinates.latitude +
            "/" +
            city.coordinates.longitude;
          return (
            <Link key={city.name}
              to={{
                pathname: urlToActivities,
                state: {
                  latitude: city.coordinates.latitude,
                  longitude: city.coordinates.longitude,
                  cityName: city.name,
                  pathname: `${props.location.state}` 
                },
              }}
            >
              <Card
                hoverable
                style={{ width: 200 }}
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "30px" }}>{city.name}</span>
                  }
                />
              </Card>
            </Link>
          );
        })}
    </div>
  );
}

export default Cities;
