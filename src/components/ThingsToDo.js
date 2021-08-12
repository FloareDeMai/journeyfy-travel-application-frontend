import { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./ActivityList.module.css";
import { Link } from "react-router-dom";
import "./ThingsToDo.css";
import { atom, useAtom } from "jotai";

const searchAtomAfterActivity = atom("");

function ThingsToDo() {
  let [topActivities, setTopActivities] = useState([]);
  let [topClubs, setTopClubs] = useState([]);
  let [topMuseums, setTopMuseums] = useState([]);
  const [searchActivity, setSearchActivity] = useAtom(searchAtomAfterActivity);
  const handleChangeActivity = (event) =>
    setSearchActivity(event.target.value.toLowerCase());

  useEffect(() => {
    fetch("museums/top-museums")
      .then((resp) => resp.json())
      .then((data) => setTopMuseums(data));
  }, []);

  useEffect(() => {
    fetch("activities/top-activities")
      .then((resp) => resp.json())
      .then((data) => setTopActivities(data));
  }, []);

  useEffect(() => {
    fetch("clubs/top-clubs")
      .then((resp) => resp.json())
      .then((data) => setTopClubs(data));
  }, []);


  let activitiesAfterSearch = Object.values(topActivities).filter((activity) => {
    return activity.name.toLowerCase().includes(searchActivity);
  });
  let clubsAfterSearch = Object.values(topClubs).filter((club) => {
    return club.name.toLowerCase().includes(searchActivity);
  });
  let museumsAfterSearch = Object.values(topMuseums).filter((museum) => {
    return museum.name.toLowerCase().includes(searchActivity);
  });


  if (searchActivity.length >= 1) {
    topActivities = activitiesAfterSearch;
    topClubs = clubsAfterSearch;
    topMuseums = museumsAfterSearch;
  }

  return (
    <div className={"atraction"}>
      <div>
        <h1>ATRACTIONS</h1>
      </div>
      <div className={classes.searchDiv}>
        <input
          className={classes.search}
          type="text"
          placeholder={"Search in atractions" }
          value={searchActivity}
          onChange={handleChangeActivity}
        />
      </div>
      <div className={classes.topClubs}>
        <h2>Top clubs</h2>
        <ul className={classes.list}>
          {topClubs.map((club) => {
            return (
              <Link
                to={{
                  pathname: `/club/${club.name}`,
                  state: {
                    club: club,
                  },
                }}
              >
                <li className={classes.content} key={club.name}>
                  <Card>
                    <div>
                      <img
                        className={classes.image}
                        src={club.pictureLink}
                        alt={club.pictureLink}
                      />
                    </div>
                    <div>
                      <h3>{club.name}</h3>
                      <h5>
                        <span>
                          Address: {club.address} {"€"}
                        </span>
                      </h5>
                      <h5>
                        <span>
                          Rating: {club.rating} {"⭐"}
                        </span>
                      </h5>
                    </div>
                  </Card>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className={classes.topMuseums}>
        <h2>Top museums</h2>
        <ul className={classes.list}>
          {topMuseums.map((museum) => {
            return (
              <Link
                to={{
                  pathname: `/museum/${museum.name}`,
                  state: {
                    museum: museum,
                  },
                }}
              >
                <li className={classes.content} key={museum.name}>
                  <Card>
                    <div>
                      <img
                        className={classes.image}
                        src={museum.pictureLink}
                        alt={museum.pictureLink}
                      />
                    </div>
                    <div>
                      <h3>{museum.name}</h3>
                      <h5>
                        <span>
                          Price: {museum.address} {"€"}
                        </span>
                      </h5>
                      <h5>
                        <span>
                          Rating: {museum.rating} {"⭐"}
                        </span>
                      </h5>
                    </div>
                  </Card>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className={classes.topActivities}>
        <h2>Top activities</h2>
        <ul className={classes.list}>
          {topActivities.map((activity) => {
            return (
              <Link
                to={{
                  pathname: `/activity/${activity.name}`,
                  state: {
                    activity: activity,
                  },
                }}
              >
                <li className={classes.content} key={activity.name}>
                  <Card>
                    <div>
                      <img
                        className={classes.image}
                        src={activity.pictureLink}
                        alt={activity.pictureLink}
                      />
                    </div>
                    <div>
                      <h3>{activity.name}</h3>
                      <h5>
                        <span>
                          Price: {activity.address} {"€"}
                        </span>
                      </h5>
                      <h5>
                        <span>
                          Rating: {activity.rating} {"⭐"}
                        </span>
                      </h5>
                    </div>
                  </Card>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ThingsToDo;
