import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "../../lib/prisma.ts";
import axios from "axios";
import Button from "../../components/Button";

const SelectedDish = ({ dish }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [titleChange, setTitleChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();

  async function editDish() {
    await axios.put(
      "/api/dish/editDish",
      {
        id: dish.id,
        title: titleChange,
        description: descriptionChange,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async function deleteDish() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/dish/delete/${dish?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dishes/");
    }
  }

  const handleTitle = (e) => {
    setTitleChange(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionChange(e.target.value);
  };

  return (
    <>
      <h2>Titre : </h2>
      {dish?.title} <br />
      <h2>Description : </h2>
      {dish?.description}
      <br />
      <h3>Ce plat nous vient de {dish?.region.name}</h3>
      <form>
        <label>Title</label> <br />
        <input
          name="dishTitle"
          type="text"
          defaultValue={dish.title}
          onChange={handleTitle}
        />
        <br />
        <label>Description</label>
        <textarea
          name="recipekDescription"
          type="text"
          style={{ width: "100%", height: "100px" }}
          defaultValue={dish.description}
          onChange={handleDescription}
        />
        <button type="submit" onClick={editDish}>
          J'édite
        </button>
      </form>
      <br />
      <button onClick={deleteDish}>Supprimer</button>
      <br />
      <br />
      <br />
      <div>
        <h2>Recettes :</h2>
        {dish.recipes.map((recipe) => (
          <div>
            <br />
            <h3>{recipe.name}</h3>
            <Button
              label="En savoir plus !"
              className="primary"
              href={`/recipes/${recipe.id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const dish = await prisma.dish.findUnique({
    where: { id: parseInt(id) },
    include: {
      recipes: true,
      region: { select: { name: true } },
    },
  });
  return {
    props: {
      dish,
    },
  };
}

export default SelectedDish;
