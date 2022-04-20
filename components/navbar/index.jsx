import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./NavBar.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import Image from "next/image";
import { useUserContext } from "../../context/UserContext";
import { Menu, Burger, Divider, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Cookies from "js-cookie";
import profile from "../../assets/images/profile.svg";
import peps from "../../assets/images/peps.svg";
import { useEffect } from "react";

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [pivot, setPivot] = useState(false);
  const token = Cookies.get('token')

  const handleClick = () => {
      Cookies.remove("token");
      setUser(null);
      router.push("/");
  };

  const parseJwt = (token) => {
    try{
        return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
        return null;
    }
}
  const jwtTokenDetails = parseJwt(token);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.displayResponsive}>
          <Link href="/" exact>
            <div className={styles.logo}>
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(${peps.src})`,
                }}
              ></div>
              <div>
                <span className={styles.brand}>Peps</span>
              </div>
            </div>
          </Link>
          {user ? (
            <div className={styles.burgerResponsive}>
              <Menu
                size="xl"
                control={
                  <div
                    className={
                      !pivot
                        ? styles.animationEnd + styles.animation
                        : styles.animation
                    }
                    onClick={() => setPivot((o) => !o)}
                  >
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                    />
                  </div>
                }
              >
                <Menu.Label>
                  <Text size="xl">Profil</Text>
                </Menu.Label>
                <Menu.Item component={NextLink} href="/profile">
                  <Text size="xl">Mon Profil</Text>
                </Menu.Item>
                <Menu.Item
                  component={NextLink}
                  href="/profile?list=true"
                  as="/profile"
                >
                  <Text size="xl">Mes Listes</Text>
                </Menu.Item>
                <Divider />
                <Menu.Item color="red" onClick={() => handleClick()}>
                  <Text size="xl">Déconnexion</Text>
                </Menu.Item>
              </Menu>
            </div>
          ) : (
            <div className={styles.burgerResponsive}>
              <a href="/login">
                <Burger opened={opened} />
              </a>
            </div>
          )}
        </div>
        <div className={styles.right}>
          <SearchBar placeholder="Chercher une recette" />
          {!user ? (
            <div className={styles.btnResponsive}>
              <Button label="Connexion" href="/login" type="warning" />
            </div>
          ) : (
            <div className={styles.btnResponsive}>
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
                <Menu.Label>Recettes</Menu.Label>
                <Menu.Item component={NextLink} href="/recipes">
                  Toutes les recettes
                </Menu.Item>
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
                <Divider />
                { jwtTokenDetails.isadmin === true ?
                <>
                  <Menu.Label>Admin</Menu.Label>
                  <Menu.Item component={NextLink} href="/admin">
                    Dashboard
                  </Menu.Item>
                  <Divider />
                </>
                :
                null
                } 
                <Menu.Item color="red" onClick={() => handleClick()}>
                  Déconnexion
                </Menu.Item>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
