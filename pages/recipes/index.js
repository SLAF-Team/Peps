import React from "react";
import RecipeCard from "../../components/recipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Recipe.module.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import { Switch, Drawer, Button, Group, ActionIcon } from "@mantine/core";
import axios from "axios";
import adjust from "../../assets/images/adjust.svg";
import Image from "next/image";

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

  const [filter, setFilter] = useState(false);

  // set up data for multiselect
  const dataTags = [];
  tags?.sort().map((tag) => dataTags.push({ value: tag.id, label: tag.name }));

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

  // set up drawer
  const [opened, setOpened] = useState(false);

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
              in: filterCountry.length > 0 ? filterCountry : idCountries,
            },
            typeId: {
              in: filterType.length > 0 ? filterType : idTypes,
            },
            tags: {
              some: { id: { in: filterTag.length > 0 ? filterTag : idTags } },
            },
            ingredientsUnit: {
              some: {
                ingredientId: {
                  in:
                    filterIngredient.length > 0
                      ? filterIngredient
                      : idIngredients,
                },
              },
            },
          },
          include: {
            _count: { select: { likes: true, comments: true } },
          },
        }
      : null;
    getRecipes(data);
  }, [filterTag, filterCountry, filterType, filterIngredient, filter]);

  return (
    <div className={classes.margin}>
      <div className="column">
        <div className="row">
          <>
            <Drawer
              opened={opened}
              onClose={() => setOpened(false)}
              title="Utiliser les filtres"
              padding="xl"
              size="xl"
            >
              <Switch
                label="Activer/Désactiver"
                checked={filter}
                onChange={handleChange}
                color="cookogsyellow"
                size="md"
              />
              <div className={classes.filters}>
                <h2 className={classes.h2}>Par Tag</h2>
                <MultiSelect
                  data={dataTags}
                  value={filterTag}
                  onChange={setFilterTag}
                  placeholder="tags"
                  searchable
                  clearable
                  className={classes.multiselect}
                  size="xs"
                  styles={{ label: { fontSize: 14 } }}
                />
                <h2 className={classes.h2}>Par Pays</h2>
                <MultiSelect
                  data={dataCountries}
                  value={filterCountry}
                  onChange={setFilterCountry}
                  placeholder="pays"
                  searchable
                  clearable
                  className={classes.multiselect}
                  size="xs"
                  styles={{ label: { fontSize: 14 } }}
                />
                <h2 className={classes.h2}>Par Type de recette</h2>
                <MultiSelect
                  data={dataTypes}
                  value={filterType}
                  onChange={setFilterType}
                  placeholder="types"
                  searchable
                  clearable
                  className={classes.multiselect}
                  size="xs"
                  styles={{ label: { fontSize: 14 } }}
                />
                <h2 className={classes.h2}>Par Ingrédient</h2>
                <MultiSelect
                  data={dataIngredients}
                  value={filterIngredient}
                  onChange={setFilterIngredient}
                  placeholder="ingrédients"
                  searchable
                  clearable
                  className={classes.multiselect}
                  size="xs"
                  styles={{ label: { fontSize: 14 } }}
                />
              </div>
            </Drawer>

            <Group position="right"></Group>
          </>
        </div>
        <div className={classes.titlecontainerindex}>
          <h1 className={classes.h1}>Toutes les recettes </h1>
          <ActionIcon
            onClick={() => setOpened(true)}
            color="cookogsyellow"
            variant="transparent"
            size="xl"
            radius="md"
            className={classes.actionicon}
          >
            <Image src={adjust} />
          </ActionIcon>
        </div>
        <div className="row">
          {filteredRecipes &&
            filteredRecipes.map((recipe, i) => (
              <RecipeCard
                recipe={recipe}
                key={i}
                like_count={recipe?._count?.likes}
                comment_count={recipe?._count?.comments}
                col="col-3 col-6-sm"
              />
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
      _count: { select: { likes: true, comments: true } },
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
