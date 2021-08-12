import React, { useState, useEffect } from "react";
import classes from "./ClubsList.module.css";
import Card from "../ui/Card";
import { Link } from "react-router-dom";

function ClubsList(props) {
  const [isLoading, setIsLoading] = useState(true);
  let [clubs, setClubs] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:8080/clubs/${props.match.params.cityName}`)
      .then(response => response.json())
      .then(data=> {
          setClubs(data);
      })
      
      
  }, [props.match.params.cityName]);

  return <div>
      {clubs.map((club) => {
          return <div>
              {club.name}
          </div>
      })}
  </div>;
}

export default ClubsList;