import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./NavBar.module.css";
import Button from "../Button";

const NavBar = () => {
  const router = useRouter();

  const handleClick = () => {
    if (window.confirm("Es tu sûr de vouloir te déconnecter?")) {
      Cookies.remove("token");
      router.push("/");
    }
  };

  return (
    <div className={styles.navbar}>
      <Button label="OM" href="/" type="primary" />
      <Button label="Connexion" href="/signin" type="warning" />
      <Button label="Inscription" href="/signup" type="success" />
      <Button
        label="Déconnexion"
        href="/signout"
        handleClick={() => handleClick()}
        type="danger"
      />
    </div>
  );
};

export default NavBar;
