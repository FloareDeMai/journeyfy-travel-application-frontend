import { Link } from "react-router-dom";
import styles from "./IntroductionPage.module.css";

function IntroductionPage() {

  return (
    <div className={styles.container}>
      <div className={styles.titleIntroduction}>
        <h1>Everything starts with one step</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.paragraphIntroduction}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
          commodo sed egestas egestas fringilla phasellus faucibus scelerisque
          eleifend. Lacus suspendisse faucibus interdum posuere lorem ipsum
          dolor sit amet. Viverra mauris in aliquam sem fringilla ut morbi
          tincidunt. Morbi non arcu risus quis. Tempus iaculis urna id volutpat.
          Velit ut tortor pretium viverra suspendisse potenti nullam.
        </p>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://images.pexels.com/photos/7368311/pexels-photo-7368311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          ></img>
        </div>
        <p className={styles.paragraphIntroduction}>
          Volutpat sed cras ornare arcu. Convallis tellus id interdum velit
          laoreet id donec. Felis eget nunc lobortis mattis. Velit euismod in
          pellentesque massa placerat duis. Pharetra magna ac placerat
          vestibulum lectus mauris ultrices. Ultricies lacus sed turpis
          tincidunt. Leo urna molestie at elementum eu facilisis sed odio morbi.
          Senectus et netus et malesuada fames. Et netus et malesuada fames ac
          turpis. Nec ullamcorper sit amet risus nullam eget felis. Neque
          viverra justo nec ultrices dui sapien. Malesuada fames ac turpis
          egestas sed tempus urna et pharetra. Netus et malesuada fames ac. Cras
          pulvinar mattis nunc sed blandit libero volutpat. Risus ultricies
          tristique nulla aliquet enim tortor. At tempor commodo ullamcorper a
          lacus vestibulum sed arcu. Eu tincidunt tortor aliquam nulla. Sed nisi
          lacus sed viverra tellus in hac habitasse platea. Et leo duis ut diam.
          Fringilla ut morbi tincidunt augue interdum velit euismod in. Odio
          pellentesque diam volutpat commodo sed egestas. Massa enim nec dui
          nunc mattis enim ut tellus elementum. Quis vel eros donec ac odio.
          Elit sed vulputate mi sit amet mauris commodo. Quis lectus nulla at
          volutpat diam. Semper eget duis at tellus at urna condimentum mattis.
          Mauris ultrices eros in cursus turpis massa. Sit amet cursus sit amet
          dictum sit amet justo donec. Platea dictumst vestibulum rhoncus est
          pellentesque elit. Rhoncus dolor purus non enim praesent elementum
          facilisis leo. Nulla aliquet enim tortor at auctor urna nunc. In
          fermentum posuere urna nec tincidunt praesent semper feugiat nibh. In
          hac habitasse platea dictumst quisque sagittis purus sit amet.
          Suspendisse ultrices gravida dictum fusce ut placerat. Sit amet cursus
          sit amet dictum sit. Eu consequat ac felis donec et odio pellentesque.
          Sociis natoque penatibus et magnis dis parturient.
        </p>
      </div>
      <div className={styles.title}>
        <Link to="/plan">
          <button className={styles.button}>Start planning</button>
        </Link>
      </div>
    </div>
  );
}

export default IntroductionPage;
