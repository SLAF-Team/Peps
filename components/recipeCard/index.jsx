import { get } from "http";
import { useUserContext } from "../../context/UserContext";
import Button from "../Button";

const RecipeCard = ({ recipe }) => {
  const { user } = useUserContext();

  const isLiked = user?.likes.some((like) => like.recipeId === recipe.id);

  console.log(recipe);

const handleDeleteLike = () => {

}

const handleCreateLike = () => {};
  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cook.name}</h2>
      {recipe.likes && <h2>Likes: {recipe._count.likes}</h2>}
      {isLiked ? (
        <Button
          className="success"
          label="liké"
          href=""
          onClick={handleDeleteLike}
        />
      ) : (
        <Button
          className="primary"
          label="like!"
          href=""
          onClick={handleCreateLike}
        />
      )}
    </>
  );
};

export default RecipeCard;
