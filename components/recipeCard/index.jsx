import { get } from "http";
import { useUserContext } from "../../context/UserContext";
import { useMemo } from "react";

const RecipeCard = ({ recipe }) => {
  const { user, setUser } = useUserContext();

  const isLiked = user?.likes.some((like) => like.recipeId === recipe.id)

  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cookId.name}</h2>
      <h2>Likes: {recipe._count}</h2>
      {/* check si c'est déjà liké */}
      <button>{isLiked ? "true" : "false" }</button>
    </>
  );
};

export default RecipeCard;
