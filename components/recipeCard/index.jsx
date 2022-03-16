const RecipeCard = ({ recipe }) => {
  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h2>{recipe.cook.name}</h2>
    </>
  );
};

export default RecipeCard;
