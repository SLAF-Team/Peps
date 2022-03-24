import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import prisma from "../../../lib/prisma.ts";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import { checkAdminAuth, checkLogAuth } from "../../../lib/authfront";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const newDish = ({ regions }) => {
  const router = useRouter();
  const { user } = useUserContext();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [auth, setAuth] = useState(false);
  const notifications = useNotifications();

  useEffect(() => {
    if(user){
      console.log('')
    } else {
      router.push('/login')
    }
  }, [])


  useEffect(() => {
    if (checkAdminAuth(user) && checkLogAuth(user)) setAuth(true);
  }, [user]);

  async function addNewDish(params) {
    setDisable(true);
    const { addTitle, addDescription, addRegion } = formRef.current;
    const title = addTitle.value;
    const description = addDescription.value;
    const region = addRegion.value;
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
      <div>
        <form ref={formRef}>
          <div>
            <label>Titre</label>
            <input name="addTitle" type="text" placeholder="Ex: Le Bortsch" />
          </div>
          <div>
            <label>Description</label>
            <input name="addDescription" type="text" placeholder="Ex: Le Bortsch est un potage d'origine ukrainienne consommé dans de nombreux pays slaves ainsi qu'en d'Asie du Nord." />
          </div>
          {regions ? (
            <div>
              <label>Region</label>
              <select name="addRegion">
                {regions.map((region) => (
                  <option value={region.id} key={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <button
            disabled={disable}
            className="btn btn-primary my-3"
            onClick={() => addNewDish()}
          >
            Créer un plat
          </button>
        </form>
      </div>
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
