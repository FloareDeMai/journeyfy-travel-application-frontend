import Header from "./Header";
import Footer from "./Footer";
import styles from "./LayoutDesign.module.css";


function LayoutDesign(props) {
  return (
    <div>
      <div className={styles.layoutContainer}>
        <Header></Header>
        <main className={styles.main}>{props.children}</main>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default LayoutDesign;
