import React, { useState, useEffect, useContext } from "react";
import Amadeus from "amadeus";
import classes from "./ActivityList.module.css";
import Card from "../ui/Card";
import { atom, useAtom } from "jotai";
import { Link } from "react-router-dom";

const searchAtomAfterActivity = atom("");

function ActivityList(props) {
  const [isLoading, setLoading] = useState(true);
  let [activities, setActivities] = useState([]);
  let [clubs, setClubs] = useState([]);
  let [museums, setMuseums] = useState([]);
  const [searchActivity, setSearchActivity] = useAtom(searchAtomAfterActivity);
  const handleChangeActivity = (event) =>
    setSearchActivity(event.target.value.toLowerCase());

  useEffect(() => {
    let amadeus = new Amadeus({
      clientId: "gfuLA4rbE3NLFR3hEp1lSUEAgeWWcR6b",
      clientSecret: "WuPTFB32DJbLgmP7",
    });

    amadeus.shopping.activities
      .get({
        latitude: props.location.state.latitude,
        longitude: props.location.state.longitude,
      })
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      });
  }, [props]);

  useEffect(() => {
    fetch(`http://localhost:8080/clubs/${props.location.state.cityName}`)
      .then((response) => response.json())
      .then((data) => {
        setClubs(data);
      });
  }, [props.location.state.cityName]);

  useEffect(() => {
    fetch(`http://localhost:8080/museums/${props.location.state.cityName}`)
      .then((response) => response.json())
      .then((data) => {
        setMuseums(data);
      });
  }, [props.location.state.cityName]);




  let activitiesAfterSearch = Object.values(activities).filter((activity) => {
    return activity.name.toLowerCase().includes(searchActivity);
  });
  let clubsAfterSearch = Object.values(clubs).filter((club) => {
    return club.name.toLowerCase().includes(searchActivity);
  });
  let museumsAfterSearch = Object.values(museums).filter((museum) => {
    return museum.name.toLowerCase().includes(searchActivity);
  });



  if (searchActivity.length >= 1) {
    activities = activitiesAfterSearch;
    clubs = clubsAfterSearch;
    museums = museumsAfterSearch;
  }

  if (isLoading) {
    <p>Loading activities...</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.searchDiv}>
        <input
          className={classes.search}
          type="text"
          placeholder={"Search in " + props.location.state.cityName}
          value={searchActivity}
          onChange={handleChangeActivity}
        />
      </div>
      <div className={classes.activities}>
        <div>
          <h1>Activities from {props.location.state.cityName}</h1>
        </div>
        <ul className={classes.list}>
          {(activities.length > 0)&&(!isLoading) ? (
            activities.map((activity) => (
              <li className={classes.content}>
                <Card>
                  <div>
                    <img
                      className={classes.image}
                      src={activity.pictures[0]}
                      alt={activity.pictures[0]}
                    ></img>
                  </div>

                  <div>
                    <h3>{activity.name}</h3>
                    <h5>
                      <span>
                        Price: {activity.price.amount}{" "}
                        {activity.price.currencyCode}
                      </span>
                    </h5>
                    <h5>
                      <span>
                        Rating:{" "}
                        {activity.rating
                          ? Number(activity.rating).toFixed(2) + "⭐"
                          : "No rating yet"}{" "}
                      </span>
                    </h5>
                    <button className={classes.btn}>Add to Favorites</button>
                  </div>
                </Card>
              </li>
            ))
          ) : (
            <li>No activities here..</li>
          )}
        </ul>
      </div>
      <div className={classes.clubs}>
        <div>
          <h1>Top Clubs from {props.location.state.cityName}</h1>
        </div>
        <ul className={classes.list}>
          {clubs.map((club) => {
            return <Link to={{
              pathname: `/club/${club.name}`,
              state: {
              club: club
            },
            }}>
            <li key={club.name} className={classes.content}>
              <Card>
                <div>
                  <img
                    className={classes.image}
                    src={club.pictureLink}
                    alt={club.name}
                  ></img>
                </div>
                <div>
                  <h3>{club.name}</h3>
                  <h5>
                    <span>{club.address}</span>
                  </h5>
                  <h5>
                    <span>
                      Rating:{" "}
                      {club.rating
                        ? Number(club.rating).toFixed(2) + "⭐"
                        : "No rating yet"}{" "}
                    </span>
                  </h5>
                </div>
              </Card>
            </li>
            </Link>
})}
        </ul>
      </div>
      <div className={classes.museums}>
        <div>
          <h1>Museums from {props.location.state.cityName}</h1>
        </div>
        <ul className={classes.list}>
          {museums.map((museum) => (
            <li key={museum.name} className={classes.content}>
              <Card>
                <div>
                  <img
                    className={classes.image}
                    src={museum.pictureLink}
                    alt={museum.name}
                  ></img>
                </div>
                <div>
                  <h3>{museum.name}</h3>
                  <h5>
                    <span>{museum.address}</span>
                  </h5>
                  <h5>
                    <span>
                      Rating:{" "}
                      {museum.rating
                        ? Number(museum.rating).toFixed(2) + "⭐"
                        : "No rating yet"}{" "}
                    </span>
                  </h5>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActivityList;
