import axios from "axios";

export const getPlacesData = async (type, bounds) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bounds.sw.lat,
          tr_latitude: bounds.ne.lat,
          bl_longitude: bounds.sw.lng,
          tr_longitude: bounds.ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "2d7f9e8e57msh09f7cd38d8df485p1ef16fjsn26aa9247b2f4",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/weather",
      {
        params: {
          lat: lat,
          lon: lng,
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "77a7dfe288mshcae2fbda6cf7425p18a5acjsnac609e2bcebc",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlacesDataByLatAndLng = async (type, latAndLng) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
      {
        params: {
          longitude: latAndLng.lng,
          latitude: latAndLng.lat,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "03428783fcmsh55a297f558069dep119b22jsn958309206635",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
