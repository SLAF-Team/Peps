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
import { useRouter } from "next/router";

const Recipes = ({ recipes, tags, countries, types, ingredients }) => {
  const { query } = useRouter();

  // set up state for multiselect
  const idTags = [];
  tags?.map((element) => idTags.push(element.id));

  const idCountries = [];
  countries?.map((element) => idCountries.push(element.id));

  const idTypes = [];
  types?.map((element) => idTypes.push(element.id));

  const idIngredients = [];
  ingredients?.map((element) => idIngredients.push(element.id));

  const [filterTag, setFilterTag] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState([]);
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

  console.log("recipes");
  console.log(recipes);
  console.log("recettes filtrées");
  console.log(filteredRecipes);

  //useEffect for filter with exceptions
  useEffect(() => {
    const filterCall = {
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    };
    const wheres = { published: true };
    if (filterCountry.length > 0) {
      wheres.countryId = { in: filterCountry };
    }
    if (filterType.length > 0) {
      wheres.typeId = { in: filterType };
    }
    if (filterTag.length > 0) {
      wheres.tags = {
        some: { id: { in: filterTag } },
      };
    }
    if (filterIngredient.length > 0) {
      wheres.ingredientsUnit = {
        some: {
          ingredientId: {
            in: filterIngredient,
          },
        },
      };
    }
    filterCall.where = wheres;
    const data = filter ? filterCall : null;
    getRecipes(data);
  }, [filterTag, filterCountry, filterType, filterIngredient, filter]);

  useEffect(() => {
    if (query.tag || query.country || query.type || query.ingredient) {
      switch (Object.keys(query)[0]) {
        case "tag":
          setFilterTag([parseInt(query.tag)]);
          break;
        case "country":
          setFilterCountry([parseInt(query.country)]);
          break;
        case "type":
          setFilterType([parseInt(query.type)]);
          break;
        case "ingredient":
          setFilterIngredient([parseInt(query.ingredient)]);
          break;
        default:
          break;
      }
    }
  }, [query.tag, query.country, query.type, query.ingredient]);

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
              className={classes.drawer}
              style={{ overflowY: "scroll" }}
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
                  placeholder="Choisir des tags"
                  searchable
                  clearable
                />
                <h2 className={classes.h2}>Par Pays</h2>
                <MultiSelect
                  data={dataCountries}
                  value={filterCountry}
                  onChange={setFilterCountry}
                  placeholder="Choisir des pays"
                  searchable
                  clearable
                />
                <h2 className={classes.h2}>Par Type de recette</h2>
                <MultiSelect
                  data={dataTypes}
                  value={filterType}
                  onChange={setFilterType}
                  placeholder="Choisir des types"
                  searchable
                  clearable
                />
                <h2 className={classes.h2}>Par Ingrédient</h2>
                <MultiSelect
                  data={dataIngredients}
                  value={filterIngredient}
                  onChange={setFilterIngredient}
                  placeholder="Choisir des ingrédients"
                  searchable
                  clearable
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
    where: { published: true },
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
