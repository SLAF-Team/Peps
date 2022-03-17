import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import RecipeCard from "../../components/recipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState(null);

  // get recipes
  async function getAllRecipes() {
    const result = await axios.get("/api/recipe/getRecipes");
    setRecipes(result.data);
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    recipes && recipes.map((recipe) => (
      <RecipeCard recipe={recipe} key={recipe.id}/>
    ))
  );
};

export default Recipes;
