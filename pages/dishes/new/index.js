import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import prisma from "../../../lib/prisma.ts";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import { checkLogAuth } from "../../../lib/authfront";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import classes from "./../Dishes.module.css";
import Button from "../../../components/Button";
import { checkAdminAuth } from "../../../lib/authfront";

const newDish = ({ regions }) => {
  const router = useRouter();
  const { user } = useUserContext();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [auth, setAuth] = useState(false);
  const notifications = useNotifications();

  useEffect(() => {
    if(token){
      return;
    } else {
      notifications.showNotification({
        title: "Connexion",
        message: "Merci de vous connecter pour accéder à cette page",
        color: "red",
      });
      router.push('/login')
    }
  }, [token])


  useEffect(() => {
    if (checkAdminAuth(user) && checkLogAuth(user)) setAuth(true);
  }, [user]);

  async function addNewDish(params) {
    setDisable(true);
    const { addTitle, addDescription, addRegion, addImageUrl } =
      formRef.current;
    const title = addTitle.value;
    const description = addDescription.value;
    const region = addRegion.value;
    const imageUrl = addImageUrl.value;
    if (!title || !description) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire",
        message: "Titre ou description vide.",
        color: "red",
      });
    } else {
      await axios.post(
        "/api/dish/addDish",
        {
          title: title,
          description: description,
          regionId: parseInt(region),
          imageUrl: imageUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDisable(false);
      notifications.showNotification({
        title: "Bravo!",
        message: "Votre recette a été publiée avec succès",
        color: "green",
      });
      router.push("/dishes");
    }
  }

  if (auth) {
    return (
      <>
        <form ref={formRef} className={classes.size}>
          <div className={classes.form}>
            <h1>Formulaire de création de plat</h1>
            <div>
              <label>Titre</label>
            </div>
            <input
              name="addTitle"
              type="text"
              placeholder="Le Bortsch"
              className={classes.field}
            />
            <div>
              <label>Description</label>
            </div>
            <input
              name="addDescription"
              type="text"
              placeholder="Le Bortsch est un potage d'origine ukrainienne consommé dans de nombreux pays slaves ainsi qu'en d'Asie du Nord."
              className={classes.field}
            />
            <div>
              <label>Image (URL)</label>
            </div>
            <input
              name="addImageUrl"
              type="text"
              placeholder="'leplusjolidesbortschs.com'"
              className={classes.field}
            />
            {regions ? (
              <>
                <div>
                  <label>Region</label>
                </div>

                <select name="addRegion" className={classes.field}>
                  {regions.map((region) => (
                    <option value={region.id} key={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </>
            ) : null}
            <div>
            <Button
              label="Créer un plat"
              handleClick={() => addNewDish()}
              href="#"
              className="button"
            />
            </div>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <p>
        Veuillez vous{" "}
        <b>
          <a href="/login/">connecter</a>
        </b>{" "}
        pour créer un plat
      </p>
    );
  }
};

export async function getServerSideProps() {
  const allRegions = await prisma.region.findMany();
  return {
    props: {
      regions: allRegions,
    },
  };
}

export default newDish;
