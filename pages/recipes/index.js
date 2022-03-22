import React from "react";
import RecipeCard from "../../components/recipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Recipe.module.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import axios from "axios";

const Recipes = ({ recipes, tags, countries, types, ingredients }) => {
  const [filterTag, setFilterTag] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState([]);
  const [filteredRecipes, setFilterRecipes] = useState(recipes);

  console.log(filterTag + filterCountry + filterType + filterIngredient);
  console.log(filteredRecipes);

  useEffect(() => {
    const data = {
      where: {
        AND: [
          {
            countryId: { in: filterCountry },
          },
          {
            typeId: { in: filterType },
          },
          {
            tags: { where: { id: { in: filterTag } } },
          },
        ],
      },
      include: {
        cook: { select: { email: true, name: true, id: true } },
        tags: { select: { id: true } },
        _count: { select: { likes: true } },
        _count: { select: { comments: true } },
      },
    };
    getRecipes();
  }, [filterTag, filterCountry, filterType]);

  const dataTags = [];
  tags?.map((tag) => dataTags.push({ value: tag.id, label: tag.name }));

  const dataCountries = [];
  countries?.map((country) =>
    dataCountries.push({ value: country.id, label: country.name })
  );

  const dataTypes = [];
  types?.map((type) => dataTypes.push({ value: type.id, label: type.name }));

  const dataIngredients = [];
  ingredients?.map((ingredient) =>
    dataIngredients.push({ value: ingredient.id, label: ingredient.name })
  );

  async function addNewList(params) {
    const { addName } = formRef.current;
    const name = addName.value;
    await axios.post(
      "/api/list/addList",
      {
        userId: user.id,
        name,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

        const result = await axios.get(`/api/recipe/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  const getRecipes = async (data) => {
    try {
      const result = await axios.get(`/api/recipe/searchRecipes`, {
          where: {
            AND: [
              {
                countryId: { in: filterCountry },
              },
              {
                typeId: { in: filterType },
              },
              {
                tags: { where: { id: { in: filterTag } } },
              },
            ],
          },
          include: {
            cook: { select: { email: true, name: true, id: true } },
            tags: { select: { id: true } },
            _count: { select: { likes: true } },
            _count: { select: { comments: true } },
          },
        },
      );
      console.log(result.data);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  return (
    <div className={classes.margin}>
      <div className="row">
        <MultiSelect
          data={dataTags}
          value={filterTag}
          onChange={setFilterTag}
          placeholder="tags"
        />
        <MultiSelect
          data={dataCountries}
          value={filterCountry}
          onChange={setFilterCountry}
          placeholder="pays"
        />
        <MultiSelect
          data={dataTypes}
          value={filterType}
          onChange={setFilterType}
          placeholder="types"
        />
        <MultiSelect
          data={dataIngredients}
          value={filterIngredient}
          onChange={setFilterIngredient}
          placeholder="ingrédients"
        />
        {recipes &&
          recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} col="col-3" />
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      cook: { select: { email: true, name: true, id: true } },
      tags: { select: { id: true } },
      _count: { select: { likes: true } },
      _count: { select: { comments: true } },
    },
  });
  const allTags = await prisma.tag.findMany({});
  const allTypes = await prisma.type.findMany({});
  const allCountries = await prisma.country.findMany({});
  const allIngredients = await prisma.ingredient.findMany({});
  return {
    props: {
      recipes: allRecipes,
      tags: allTags,
      types: allTypes,
      countries: allCountries,
      ingredients: allIngredients,
    },
  };
}

export default Recipes;
