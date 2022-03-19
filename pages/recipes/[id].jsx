import prisma from "../../lib/prisma.ts";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SelectedRecipe = ({ recipe }) => {
  const token = Cookies.get("token");
  const router = useRouter();



  async function deleteRecipe() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/recipe/delete/${recipe?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/recipes/");
    }
  }


  return (
    <div style={{ margin:"20px"}}>
        <img src={recipe.imageUrl} style={{ width:"200px"}}/>
        <h1>{recipe.name}</h1>
        <h2>Une variante de NOMDUPLAT{recipe.dish}</h2>
        <p>Description: {recipe.description}</p>
        <p>Etapes: {recipe.steps}</p>
        <button onClick={deleteRecipe}>Supprimer</button>
    </div>
  )
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
  });
  return {
    props: {
      recipe,
    },
  };
}

export default SelectedRecipe;
