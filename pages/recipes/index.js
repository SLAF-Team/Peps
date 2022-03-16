import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState(null);

  // get dishs
  async function getAllRecipes() {
    const result = await axios.get("/api/recipe/getRecipes");
    setRecipes(result.data);
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      {recipes ? (
        <>
          {recipes.map((recipe) => (
            <h1 key={recipe.id}>{recipe.name}</h1>
            // <RecipeCard recipe={recipe}/>
          ))}
        </>
      ) : null}
    </>
  );
};

export default Recipes;
