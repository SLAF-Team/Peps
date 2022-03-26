import Navbar from "../navbar";
import Footer from "../Footer";
import classes from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className={classes.minHeight}>{children}</div>
      <Footer />
    </div>
  );
}
