import prisma from "../../lib/prisma.ts";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import CommentsList from "./../../components/Comment/CommentsList";

const SelectedRecipe = ({ recipe }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [nameChange, setNameChange] = useState();
  const [descriptionChange, setDescriptionChange] = useState();
  const [comments, setComments] = useState(recipe.comments);

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
    <div style={{ margin: "20px" }}>
      <img src={recipe.imageUrl} style={{ width: "200px" }} />
      <h1>{recipe.name}</h1>
      <h2>Une variante de {recipe.dish.title}</h2>
      <p>Proposé par {recipe.cook.name}</p>
      <p>Description: {recipe.description}</p>
      <p>Etapes: {recipe.steps}</p>
      <h3>Commentaires</h3>
      <CommentsList comments={comments} />
      <button onClick={deleteRecipe}>Supprimer</button>
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
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
    include: {
      dish: { select: { title: true } },
      cook: { select: { name: true } },
      likes: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  return {
    props: {
      recipe,
    },
  };
}

export default SelectedRecipe;
