import { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./ActivityList.module.css";



function ThingsToDo() {
  const [topActivities, setTopActivities] = useState([])
  const [topClubs, setTopClubs] = useState([])
  const [topMuseums, setTopMuseums] = useState([]);
  
  
  

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

    const atractions = [...topClubs, ...topMuseums]
    
    
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Top atractions</h2>
      <ul className={classes.list}>
        {atractions.map((atraction) => {
          return (
            <li className={classes.content} key={atraction.name}>
              <Card>
                <div>
                  <img
                    className={classes.image}
                    src={atraction.pictureLink}
                    alt={atraction.pictureLink}
                  />
                </div>
                <div>
                  <h3>{atraction.name}</h3>
                  <h5>
                    <span>
                      Price: {atraction.price} {"€"}
                    </span>
                  </h5>
                  <h5>
                    <span>
                      Rating: {atraction.rating} {"⭐"}
                    </span>
                  </h5>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      <h2 style={{ textAlign: "center" }}>Top activities</h2>
      <ul className={classes.list}>
        {topActivities.map((activity) => {
          return (
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
                      Price: {activity.price} {"€"}
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
          );
        })}
      </ul>
    </div>
  );
}

export default ThingsToDo;