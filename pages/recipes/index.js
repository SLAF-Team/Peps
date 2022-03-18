import React from "react";
import RecipeCard from "../../components/RecipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";

const Recipes = ({ recipes }) => {
  return (
    recipes &&
    recipes.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />)
  );
};

export async function getServerSideProps() {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      cook: { select: { email: true, name: true, id: true } },
      _count: { select: { likes: true } },
    },
  });
  return {
    props: {
      recipes: allRecipes,
    },
  };
}

export default Recipes;
