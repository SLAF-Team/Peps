import { get } from "http";
import { useUserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";

const RecipeCard = ({ recipe }) => {
  const { user } = useUserContext();

  const isLiked = user?.likes.some((like) => like.recipeId === recipe.id);

  console.log(recipe)
  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cook.name}</h2>
      {recipe.likes && <h2>Likes: {recipe._count.likes}</h2>}
      {/* check si c'est déjà liké */}
      <button>{isLiked ? "true" : "false"}</button>
    </>
  );
};

export default RecipeCard;
