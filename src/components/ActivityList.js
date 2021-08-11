import React, { useState, useEffect, useContext } from "react";
import Amadeus from "amadeus";
import classes from "./ActivityList.module.css";
import Card from "../ui/Card";
import { atom, useAtom } from 'jotai';

const searchAtomAfterActivity = atom('');

function ActivityList(props) {
  const [isLoading, setLoading] = useState(true);
  let [activities, setActivities] = useState([]);
  const [searchActivity, setSearchActivity] = useAtom(searchAtomAfterActivity);
  const handleChangeActivity = event => setSearchActivity(event.target.value.toLowerCase());

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

  let activitiesAfterSearch = Object.values(activities).filter((activity) => {
    return activity.name.toLowerCase().includes(searchActivity)
  })

  if (searchActivity.length >= 1) {
    activities = activitiesAfterSearch
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
          placeholder="Search for an activity"
          value={searchActivity}
          onChange={handleChangeActivity}
        />
      </div>
      <ul className={classes.list}>
        {activities.length > 0 ? (
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
                    <span>Rating: {activity.rating ? Number(activity.rating).toFixed(2) +  "⭐" : "No rating yet"} </span>
                  </h5>
                  <button className={classes.btn}>Add to Favorites</button>
                </div>
              </Card>
            </li>
          ))
        ) : (
          <li>No activities yet...</li>
        )}
      </ul>
    </div>
  );
}

export default ActivityList;
