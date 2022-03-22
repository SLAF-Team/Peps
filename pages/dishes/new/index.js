import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import prisma from "../../../lib/prisma.ts";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import { checkAdminAuth, checkLogAuth } from "../../../lib/authfront";

const newDish = ({ regions }) => {
  const { user } = useUserContext();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (checkAdminAuth(user) && checkLogAuth(user)) setAuth(true);
  }, [user]);

  async function addNewDish(params) {
    setDisable(true);
    const { addTitle, addDescription, addRegion } = formRef.current;
    const title = addTitle.value;
    const description = addDescription.value;
    const region = addRegion.value;
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
  }

  if (auth) {
    return (
      <div>
        <form ref={formRef}>
          <div>
            <label>Titre</label>
            <input name="addTitle" type="text" />
          </div>
          <div>
            <label>Description</label>
            <input name="addDescription" type="text" />
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
        pour écrire un commentaire
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
