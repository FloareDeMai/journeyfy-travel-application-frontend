import Header from "./Header";
import Footer from "./Footer";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <Header></Header>
      <main className={classes.main}>{props.children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;