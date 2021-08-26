import { Card } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import styles from "./Explore.module.css";
import CountryImage from "./CountryImage";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory"


const { Meta } = Card;

function Explore() {
  let [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL_COUNTRIES = "https://restcountries.eu/rest/v2/region/europe";

  useEffect(() => {
    axios.get(API_URL_COUNTRIES).then((response) => {
      setCountries(response.data);
      setIsLoading(false);
    });
  }, []);

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
      <BreadcrumbHistory name="about" times={{"pages" : [
                                                      {"name":"explore", "link":""},
                                                      ]}} />
      <h1 className={styles.title}>Where do you want to go .. ?</h1>
      <div className={styles.container}>
      
        {countries.map((country) => {
          return (
            <Link
              key={country.name}
              to={{
                pathname: "/cities/" + country.alpha2Code,
                state: country.alpha2Code,
              }}
            >
              <Card
                hoverable
                style={{ width: 200 }}
                cover={
                  <CountryImage
                    text2={country.capital.toLowerCase()}
                  ></CountryImage>
                }
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "30px" }}>{country.name}</span>
                  }
                  description={<span style={{fontSize: '18px', color: 'black'}}>
                    <div>{country.currencies[0].code}</div>
                    </span>}
                />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Explore;
