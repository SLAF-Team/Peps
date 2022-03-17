import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";

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
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </>
      ) : null}
    </>
  );
};

export default Recipes;
