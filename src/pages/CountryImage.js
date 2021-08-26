import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function CountryImage(props) {
  let [countryPicture, setCountryPicture] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  // let URL = `https://restcountries.eu/data/${props.text}.svg`;
  let URL2 = `https://api.teleport.org/api/urban_areas/slug%3A${props.text2}/images/`;

  useEffect(()=> axios.get(URL2).then((response) => {
      setCountryPicture(response.data.photos[0].image.mobile)
      console.log(response.data.photos[0].image.mobile)
      setIsLoading(false)
  }), [URL2])

  if (isLoading) {

  }

  return <img alt={props.name} src={countryPicture} />;
}

export default CountryImage;
