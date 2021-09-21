import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";

import { getPlacesData } from "../components/map/api/getDataAPI";

function TestingPlaces() {
  const [type, setType] = useState("hotels");

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  useEffect(() => {
    if (coordinates) {
      setBounds({
        ne: { lat: coordinates.lat + 0.01, lng: coordinates.lng + 0.01 },
        sw: { lat: coordinates.lat - 0.01, lng: coordinates.lng - 0.01 },
      });
    }
  }, [coordinates]);

  console.log(coordinates);
  console.log(bounds);
  return (
    <div>
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div>
            <div>
              <SearchBar onRequestSearch={() => onPlaceChanged()} />
            </div>
          </div>
        </Autocomplete>
      </div>
      <div>
        {places.map((place) => {
          return <p>{place.name}</p>;
        })}
      </div>
    </div>
  );
}

export default TestingPlaces;
