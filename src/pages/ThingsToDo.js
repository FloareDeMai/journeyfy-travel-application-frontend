import { React, useState, useEffect } from "react";
import { Card } from "antd";
import styles from "./ThingsToDo.module.css";
import { Link } from "react-router-dom";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import { atom, useAtom } from "jotai";
import {addToWishlist} from "../components/layout/addToWishlist";

const { Meta } = Card;
const searchAtomAfterActivity = atom("");

function ThingsToDo() {
  let [topActivities, setTopActivities] = useState([]);
  let [topClubs, setTopClubs] = useState([]);
  let [topMuseums, setTopMuseums] = useState([]);
  const [searchActivity, setSearchActivity] = useAtom(searchAtomAfterActivity);
  const handleChangeActivity = (event) =>
    setSearchActivity(event.target.value.toLowerCase());

  useEffect(() => {
    fetch("http://localhost:8080/museums/top-museums")
      .then((resp) => resp.json())
      .then((data) => setTopMuseums(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/activities/top-activities")
      .then((resp) => resp.json())
      .then((data) => setTopActivities(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/clubs/top-clubs")
      .then((resp) => resp.json())
      .then((data) => setTopClubs(data));
  }, []);

  let activitiesAfterSearch = Object.values(topActivities).filter(
    (activity) => {
      return activity.name.toLowerCase().includes(searchActivity);
    }
  );
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

  const handleClickWish = async e => {
      e.preventDefault()
      let user = JSON.parse(localStorage.getItem('user'))
      let wish = {'name' : e.currentTarget.getAttribute('data-name'),
          'activity_entity_id' : e.currentTarget.getAttribute('data-id'),
          'user_id' : user.id
      }
      console.log(wish)
      addToWishlist(wish)
  }

  return (
    <div>
      <h1 className={styles.title}>Atractions</h1>
      <div className={styles.searchDiv}>
        <input
          className={styles.search}
          type="text"
          placeholder={"Search in atractions"}
          value={searchActivity}
          onChange={handleChangeActivity}
        />
      </div>
      <h2 style={{textAlign:"center"}}>Top Clubs</h2>

      <div className={styles.container}>
        <BreadcrumbHistory
          name="about"
          times={{
            pages: [{ name: "things to do", link: "" }],
          }}
        />

        {topClubs.map((club) => {
          return (
            <Link
              key={club.name}
              to={{
                pathname: `/club/${club.name}`,
                state: { club: club },
              }}
            >
              <Card
                className={styles.hozoccard}
                hoverable
                style={{
                  width: 300,
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
                cover={
                  <div>
                    <img
                      className={styles.cardImage}
                      alt={club.name}
                      src={club.pictureLink}
                    />
                    <svg
                        data-id={club.id}
                        data-name={club.name}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className={styles.wishIcon}
                      viewBox="0 0 16 16"
                        onClick={handleClickWish}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </div>
                }
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {club.name}
                    </span>
                  }
                />
                <h3 className={styles.text}>
                  <span>
                    <small style={{ fontSize: "20px" }}>
                      Price: {club.price} EUR
                    </small>
                  </span>
                </h3>
                <h3>
                  <span>
                    {club.rating
                      ? Number(club.rating).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                  </span>
                </h3>
              </Card>
            </Link>
          );
        })}
      </div>
      <h2 style={{textAlign:"center"}}>Top Museums</h2>
      <div className={styles.container}>
        
        {topMuseums.map((museum) => {
          return (
            <Link
              key={museum.name}
              to={{
                pathname: `/museums/${museum.name}`,
                state: { museum: museum },
              }}
            >
              <Card
                className={styles.hozoccard}
                hoverable
                style={{
                  width: 300,
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
                cover={
                  <div>
                    <img
                      className={styles.cardImage}
                      alt={museum.name}
                      src={museum.pictureLink}
                    />
                    <svg
                        data-id={museum.id}
                        data-name={museum.name}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className={styles.wishIcon}
                      viewBox="0 0 16 16"
                        onClick={handleClickWish}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </div>
                }
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {museum.name}
                    </span>
                  }
                />
                <h3 className={styles.text}>
                  <span>
                    <small style={{ fontSize: "20px" }}>
                      Price: {museum.price} EUR
                    </small>
                  </span>
                </h3>
                <h3>
                  <span>
                    {museum.rating
                      ? Number(museum.rating).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                  </span>
                </h3>
              </Card>
            </Link>
          );
        })}
      </div>
      <h2 style={{textAlign:"center"}}>Top Activities</h2>
      <div className={styles.container}>
        
        {topActivities.map((activity) => {
          return (
            <Link
              key={activity.name}
              to={{
                pathname: `/activity-details/${activity.name}`,
                state: { activity: activity },
              }}
            >
              <Card
                className={styles.hozoccard}
                hoverable
                style={{
                  width: 300,
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
                cover={
                  <div>
                    <img
                      className={styles.cardImage}
                      alt={activity.name}
                      src={activity.pictureLink}
                    />
                    <svg
                        data-id={activity.id}
                        data-name={activity.name}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className={styles.wishIcon}
                      viewBox="0 0 16 16"
                        onClick={handleClickWish}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </div>
                }
              >
                <Meta
                  className={styles.card}
                  title={
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {activity.name}
                    </span>
                  }
                />
                <h3 className={styles.text}>
                  <span>
                    <small style={{ fontSize: "20px" }}>
                      Price: {activity.price} EUR
                    </small>
                  </span>
                </h3>
                <h3>
                  <span>
                    {activity.rating
                      ? Number(activity.rating).toFixed(2) + "⭐"
                      : "No rating yet"}{" "}
                  </span>
                </h3>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ThingsToDo;
