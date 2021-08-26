import React from "react";
import styles from "./About.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";


function readMeClick() {
  let dots = document.querySelector("#dots");
  let moreText = document.querySelector("#more");
  let readMeButton = document.querySelector("#readMeButton");
  if (dots.style.display === "none") {
    dots.style.display = "inline";
    readMeButton.innerHTML = '<small>read more</small>';
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    readMeButton.innerHTML = '<small>read less</small>';
    moreText.style.display = "inline";
  }
}

function About() {
  return (
    <div className={styles.container}>
      <BreadcrumbHistory
        name="about"
        times={{ pages: [{ name: "about", link: "" }] }}
      />
      <div className={styles.titleAbout}>
        <h1>Our Manifest</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.paragraphIntroduction}>
          Volutpat sed cras ornare arcu. Convallis tellus id interdum velit
          laoreet id donec. Felis eget nunc lobortis mattis. Velit euismod in
          pellentesque massa placerat duis. Pharetra magna ac placerat
          vestibulum lectus vestibulum lectus mauris ultrices. Ultricies lacus
          sed turpis tincidunt. Leo urna molestie at elementum eu vestibulum
          lectus mauris ultrices. Ultricies lacus sed turpis tincidunt. Leo urna
          molestie at elementum eu facilisis sed odio morbi. Senectus et netus
          et malesuada fa  vestibulum lectus mauris ultrices. Ultricies lacus sed turpis
          tincidunt. Leo urna molestie at elementum eu facilisis sed odio morbi.
          Senectus et netus et malesuada fames. Et netus et malesuada fames ac
          turpis. Nec ullamcorper sit amet risus nullam eget felis.mes. Et netus et malesuada fames ac turpis. Nec
          ullamcorper sit amet risus nullam eget felis.facilisis sed odio morbi.
          Senectus et netus et malesuada fames. Et netus et malesuada fames ac
          turpis. Nec ullamcorper sit amet risus nullam eget felis.mauris
          ultrices. Ultricies lacus sed turpis tincidunt. Leo urna molestie at
          elementum eu facilisis sed odio morbi. Senectus et netus et malesuada
          fames. Et netus et malesuada fames ac turpis. Nec ullamcorper sit amet
          risus nullam eget felis. vestibulum lectus mauris ultrices. Ultricies
          lacus sed turpis tincidunt. Leo urna molestie at elementum eu
          facilisis sed odio morbi. Senectus et vestibulum lectus mauris
          ultrices. Ultricies lacus sed turpis tincidunt. Leo urna molestie at
          elementum eu facilisis sed odio morbi. Senectus et netus et malesuada
          fames. Et netus et malesuada fames ac turpis. Nec ullamcorper sit amet
          risus nullam eget felis. netus et malesuada fames. Et netus et
          malesuada fames ac turpis. Nec ullamcorper sit amet risus nullam eget
          felis. Neque
          <span id="dots">    ...</span>
          <span id="more" className={styles.more}>
            erisque e  vestibulum lectus mauris ultrices. Ultricies lacus sed turpis
          tincidunt. Leo urna molestie at elementum eu facilisis sed odio morbi.
          Senectus et netus et malesuada fames. Et netus et malesuada fames ac
          turpis. Nec ullamcorper sit amet risus nullam eget felis.nim ligula venenatis dolor. Maecenas nisl est, ultrices nec
            congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
            aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
            ac. In at libero sed nunc venenatis imperdiet sed ornare turpis.
            Donec vitae dui eget tellus gravida venenatis. Integer fringilla
            congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.       
          </span>
          <button onClick={readMeClick} id="readMeButton" className={styles.readMeButton}>
            <small>readmore</small>
          </button>
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="https://i.ibb.co/b78vFNh/pexels-photo-2303781-2.jpg"
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default About;
