import { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./ActivityList.module.css";
import { Link } from "react-router-dom";


function MuseumsList(props) {
  let [museums, setMuseums] = useState([]);

  let cityName = props.match.params.cityName;

  useEffect(() => {
    fetch(`${cityName}`)
      .then((resp) => resp.json())
      .then((data) => setMuseums(data));
  }, [cityName, setMuseums]);

  return (
    <div>
      <ul className={classes.list}>
        {museums.map((museum) => {
          return (
            <Link
              to={{
                pathname: `/museum/${museum.name}`,
                state: {
                  museum: museum,
                },
              }}
            >
              <li className={classes.content}>
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
                        Price: {museum.price} {"€"}
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
  );
}

export default MuseumsList;