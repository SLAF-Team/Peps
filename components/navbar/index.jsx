import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./NavBar.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import Image from "next/image";
import { useUserContext } from "../../context/UserContext";
import { Menu, Burger } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Cookies from "js-cookie";
import profile from "../../assets/images/profile.svg";

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [pivot, setPivot] = useState(false);

  const handleClick = () => {
    if (window.confirm("Es tu sûr de vouloir te déconnecter?")) {
      Cookies.remove("token");
      setUser(null);
      router.push("/");
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <div>
          <Link href="/" exact>
            <span className={styles.brand}>Cookogs</span>
          </Link>
        </div>
        <div className={styles.right}>
          <SearchBar placeholder="Chercher une recette" />
          {!user ? (
            <>
              <div className={styles.btnResponsive}>
                <Button label="Connexion" href="/login" type="warning" />
              </div>
              <div className={styles.burgerResponsive}>
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
              </div>
            </>
          ) : (
            <Menu
              control={
                <div
                  className={
                    !pivot
                      ? styles.animationEnd + styles.animation
                      : styles.animation
                  }
                  onClick={() => setPivot((o) => !o)}
                >
                  <Image src={profile} width={26} height={26} />
                </div>
              }
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
              <Menu.Item
                component={NextLink}
                href="/profile?list=true"
                as="/profile"
              >
                Mes Listes
              </Menu.Item>
              <Menu.Item color="red" onClick={() => handleClick()}>
                Déconnexion
              </Menu.Item>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
