import { useUserContext } from "../../context/UserContext";
import Button from "../Button";
import axios from "axios";
import Cookies from "js-cookie";

const RecipeCard = ({ recipe }) => {
  const { user } = useUserContext();
  const token = Cookies.get("token")

  const isLiked = user?.likes.some((like) => like.recipeId === recipe.id);

  async function addLike() {
    const result = await axios.put(
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
    console.log(result);
  }

  async function removeLike(post_id) {
    const result = await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        likes: {
          delete: [
            {
              id: post_id,
            },
          ],
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  const handleDeleteLike = () => {
    const id = user.likes.find((like) => like.recipeId === recipe.id);
    console.log(id)
    // removeLike();
  };

  const handleCreateLike = () => {
    addLike();
  };

  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cook.name}</h2>
      {recipe.likes && <h2>Likes: {recipe._count.likes}</h2>}
      {isLiked ? (
        <button onClick={handleDeleteLike}>Liké</button>
      ) : (
        <button onClick={handleCreateLike}>Like!</button>
      )}
    </>
  );
};

export default RecipeCard;
