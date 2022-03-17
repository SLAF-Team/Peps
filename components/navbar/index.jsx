import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import { useUserContext } from "../../context/UserContext";
import { Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Cookies from "js-cookie";

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
          <Menu
            className={styles.burger}
            sx={(theme) => ({
              backgroundColor: "#FFD12F",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: theme.fn.darken("#FFD12F", 0.05),
              },
            })}
          >
            <Menu.Label>Profil</Menu.Label>
            <Menu.Item component={NextLink} href="/profile">
              Mon Profil
            </Menu.Item>
            <Menu.Item>Mes Listes</Menu.Item>
            <Menu.Item color="red" onClick={() => handleClick()}>
              Déconnexion
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default NavBar;
