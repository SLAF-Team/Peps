import prisma from "../../lib/prisma.ts";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from "./Recipe.module.css";
import Button from "../../components/Button";

const SelectedRecipe = ({ recipe }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [nameChange, setNameChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();

  async function editRecipe() {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        name: nameChange,
        description: descriptionChange,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  const handleName = (e) => {
    setNameChange(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionChange(e.target.value);
  };

  async function deleteRecipe() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/recipe/delete/${recipe?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/recipes/");
    }
  }

  return (
    <div style={{ margin: "20px" }} className={classes.maincontainer}>
      <div className={classes.leftcontainer}>
        <img src={recipe.imageUrl} className={classes.mainImage} />
        <div className={classes.titlecontainer}>
          <h1 className={classes.h1}>{recipe.name}</h1>
          <h2 className={classes.h2}>{recipe.type.name}</h2>
        </div>
        <div className={classes.dishcontainer}>
          <p className={classes.dishtitle}>
            Une recette de {recipe.dish.title}
          </p>
        </div>
        <p className={classes.description}>Description: {recipe.description}</p>
        <p>Etapes: {recipe.steps}</p>
      </div>
      <div className={classes.rightcontainer}>
        <div className={classes.detailscontainer}>
          <h3 className={classes.h3}>Ingrédients</h3>
          <ul>
            <li className={classes.li}>Tomate</li>
            <li className={classes.li}>Huile d'olive</li>
            <li className={classes.li}>Oeufs</li>
            <li className={classes.li}>Courgettes</li>
            <li className={classes.li}>Ail</li>
          </ul>
        </div>
        <div className={classes.detailscontainer}>
          <h3 className={classes.h3}>Tags</h3>
          <ul>
            <li className={classes.li}>Vegan</li>
            <li className={classes.li}>Sans Sucre</li>
            <li className={classes.li}>Piquant</li>
          </ul>
        </div>
        <div className={classes.detailscontainer}>
        </div>
        <div className={classes.editcontainer}>
        <br></br>
          <Button
            label="Supprimer"
            type="danger"
            handleClick={() => deleteRecipe()}
            href=""
            className={classes.button}
          /><br></br>
          <Button
            label="Editer"
            type="warning"
            handleClick={() => editRecipe()}
            href=""
            className={classes.button}
          />
        </div>
      </div>
      {/*
      <form>
        <label>Name</label> <br />
        <input
          name="recipeName"
          type="text"
          defaultValue={recipe.name}
          onChange={handleName}
        />
        <br />
        <label>Description</label>
        <textarea
          name="recipeDescription"
          type="text"
          style={{ width: "100%", height: "100px" }}
          defaultValue={recipe.description}
          onChange={handleDescription}
        />
        <button type="submit" onClick={editRecipe}>
          J'édite
        </button>
      </form> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
    include: {
      dish: { select: { title: true } },
      type: { select: { name: true } },
    },
  });
  return {
    props: {
      recipe,
    },
  };
}

export default SelectedRecipe;
