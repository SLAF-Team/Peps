import Navbar from "../navbar";
import Footer from "../Footer";
import styles from "./Layout.module.css";
import classes from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Navbar />
      </div>
      <div className={classes.body}>{children}</div>
      <Footer className={classes.footer} />
    </div>
  );
}
