import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";

const Recipes = (props) => {
  const recipes = props.recipes;

  return (
    recipes &&
    recipes.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />)
  );
};

export async function getServerSideProps() {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      cook: { select: { email: true, name: true, id: true } },
      _count: {select: {likes: true}},
    },
  });
  return {
    props: {
      recipes: allRecipes,
    },
  };
}

export default Recipes;
