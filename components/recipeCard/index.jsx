import { get } from "http";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react/cjs/react.development";

const RecipeCard = ({ recipe }) => {
  const { user, setUser } = useUserContext();
  const [likes, setLikes] = useState(null);

  

  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cook.name}</h2>
      <h2>Likes: {recipe._count.likes}</h2>
    </>
  );
};

export default RecipeCard;
