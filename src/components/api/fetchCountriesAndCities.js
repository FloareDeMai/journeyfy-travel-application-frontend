import axios from "axios";
const {token} = require('../../config.json')

export const getCountries = async () => {
  try {
    const { data } = await axios.get(
      "https://referential.p.rapidapi.com/v1/country",
      {
        params: {
          fields:
            "currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code",
        },
        headers: {
          "x-rapidapi-host": "referential.p.rapidapi.com",
          "x-rapidapi-key":
            token,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async (country) => {
  try {
    const { data } = await axios.get(
      "https://spott.p.rapidapi.com/places/autocomplete",
      {
        params: { country: country, limit: "100" },
        headers: {
          "x-rapidapi-host": "spott.p.rapidapi.com",
          "x-rapidapi-key":
            token,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
