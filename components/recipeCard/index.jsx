import { useUserContext } from "../../context/UserContext";
import Button from "../Button";
import axios from "axios";
import Cookies from "js-cookie";

const RecipeCard = ({ recipe }) => {
  const { user } = useUserContext();
  const token = Cookies.get("token");

  const isLiked = user?.likes.some((like) => like.recipeId === recipe.id);

  async function addLike() {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        likes: {
          create: [
            {
              userId: user.id,
            },
          ],
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async function removeLike() {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        likes: {
          deleteMany: {
            userId: user.id,
          },
        },
      },

      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  const handleDeleteLike = () => {
    removeLike();
  };

  const handleCreateLike = () => {
    addLike();
  };

  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cookId.name}</h2>
      <h2>Likes: {recipe._count}</h2>
      {/* check si c'est déjà liké */}
      {isLiked ? (
        <button onClick={handleDeleteLike}>Liké</button>
      ) : (
        <button onClick={handleCreateLike}>Like!</button>
      )}
    </>
  );
};

export default RecipeCard;
