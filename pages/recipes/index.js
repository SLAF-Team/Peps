import React from "react";
import RecipeCard from "../../components/recipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Recipe.module.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import { Switch } from "@mantine/core";
import axios from "axios";

const Recipes = ({ recipes, tags, countries, types, ingredients }) => {
  // set up state for multiselect

  const idTags = [];
  tags?.map((element) => idTags.push(element.id));
  const [filterTag, setFilterTag] = useState(idTags);

  const idCountries = [];
  countries?.map((element) => idCountries.push(element.id));
  const [filterCountry, setFilterCountry] = useState(idCountries);

  const idTypes = [];
  types?.map((element) => idTypes.push(element.id));
  const [filterType, setFilterType] = useState(idTypes);

  const idIngredients = [];
  ingredients?.map((element) => idIngredients.push(element.id));
  const [filterIngredient, setFilterIngredient] = useState(idIngredients);

  const [filteredRecipes, setFilterRecipes] = useState(recipes);

  const [filter, setFilter] = useState(true);

  // set up data for multiselect
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

  // async search fonction
  const getRecipes = async (data) => {
    try {
      const result = await axios.post(`/api/recipe/searchRecipes`, {
        ...data,
      });
      setFilterRecipes(result.data);
    } catch (err) {
      console.log("error");
    }
  };

  // change filter state
  const handleChange = () => {
    setFilter(!filter);
  };

  //useEffect for filter with exception if filter not used (ternaire <3)
  useEffect(() => {
    const data = filter
      ? {
          where: {
            countryId: {
              in: filterCountry,
            },
            typeId: {
              in: filterType,
            },
            tags: {
              some: { id: { in: filterTag } },
            },
            ingredientsUnit: {
              some: {
                ingredientId: { in: filterIngredient },
              },
            },
          },
        }
      : null;
    getRecipes(data);
  }, [filterTag, filterCountry, filterType, filterIngredient, filter]);

  return (
    <div className={classes.margin}>
      <div className="column">
        <div className="row">
          <Switch
            label="Utiliser les filtres"
            checked={filter}
            onChange={handleChange}
            color="cyan"
          />
          {filter && (
            <>
              <MultiSelect
                data={dataTags}
                value={filterTag}
                onChange={setFilterTag}
                placeholder="tags"
                searchable
                clearable
              />
              <MultiSelect
                data={dataCountries}
                value={filterCountry}
                onChange={setFilterCountry}
                placeholder="pays"
                searchable
                clearable
              />
              <MultiSelect
                data={dataTypes}
                value={filterType}
                onChange={setFilterType}
                placeholder="types"
                searchable
                clearable
              />
              <MultiSelect
                data={dataIngredients}
                value={filterIngredient}
                onChange={setFilterIngredient}
                placeholder="ingrédients"
                searchable
                clearable
              />
            </>
          )}
        </div>
        <div className="row">
          {filteredRecipes &&
            filteredRecipes.map((recipe, i) => (
              <RecipeCard recipe={recipe} key={i} col="col-3" />
            ))}
        </div>
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
