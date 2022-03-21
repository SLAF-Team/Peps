import React from "react";
import RecipeCard from "../../components/recipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Recipe.module.css";

const Recipes = ({ recipes }) => {
  return (
    <div className={classes.cards}>
      {recipes &&
      recipes.map((recipe, i) => (
          <RecipeCard recipe={recipe} key={i} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      cook: { select: { email: true, name: true, id: true } },
      _count: { select: { likes: true } },
      _count: { select: { comments: true } },
    },
  });
  return {
    props: {
      recipes: allRecipes,
    },
  };
}

export default Recipes;

