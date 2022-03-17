import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState(null);

<<<<<<< HEAD
  // get recipes
=======
  // get dishes
>>>>>>> 7dfe0046208e61f01c84227c3a632e8d6f6615b6
  async function getAllRecipes() {
    const result = await axios.get("/api/recipe/getRecipes");
    setRecipes(result.data);
pages/api/user/getUser.js  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      {recipes ? (
        <>
          {recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id}/>
          ))}
        </>
      ) : null}
    </>
  );
};

export default Recipes;
