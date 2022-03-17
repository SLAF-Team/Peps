import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useUserContext } from "../../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const handleClick = () => {
    if (window.confirm("Es tu sûr de vouloir te déconnecter?")) {
      Cookies.remove("token");
      router.push("/");
    }
  };

  return (
    <div className={styles.navbar}>
      <div>
        <Link href="/" exact>
          <span className={styles.brand}>Cookogs</span>
        </Link>
      </div>
      <div className={styles.right}>
        <SearchBar placeholder="Chercher une recette" />
        {!user ? (
          <Button label="Connexion" href="/signin" type="warning" />
        ) : (
          <Button
            label="Déconnexion"
            href="/signout"
            handleClick={() => handleClick()}
            type="danger"
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
