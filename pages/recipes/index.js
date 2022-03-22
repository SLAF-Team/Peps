import React from "react";
import RecipeCard from "../../components/recipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Recipe.module.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";

const Recipes = ({ recipes, tags, countries, types, ingredients }) => {
  const [filterTag, setFilterTag] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterType, setFilterType] = useState([]);

  const [filterIngredient, setFilterIngredient] = useState([]);

  const [filteredRecipes, setFilterRecipes] = useState(recipes);

  useEffect(() => {
    const data = {
      include: {
        cook: { select: { email: true, name: true, id: true } },
        tags: { select: { id: true } },
        _count: { select: { likes: true } },
        _count: { select: { comments: true } },
      },
      where: {
        AND: [
          {
            countryId: { in: filterCountry },
          },
          {
            typeId: { in: filterType },
          },
        ],
      },
    };
    setFilterRecipes(getRecipes(data));
  }, [filterTag, filterCountry]);

  console.log(filterTag);
  console.log(filterCountry);

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

  const getRecipes = async (data) => {
    try {
      const result = await axios.get(`/api/recipe/getRecipes`, {
        data,
      });
      console.log(data);
    } catch (err) {
      console.log("error");
    }
  };

  //   include: {
  // cook: { select: { email: true, name: true, id: true } },
  // tags: { select: { id: true } },
  // _count: { select: { likes: true } },
  // _count: { select: { comments: true } },

  // const [showAddShackModal, setShowAddShackModal] = useState(false);
  // const [filter, setFilter] = useState("");
  // const [shacks, setShacks] = useState(props.shacks);

  // const handleFilter = (e) => {
  //   setFilter(e.target.value);
  // };

  // async function getSearchedShacks(filter) {
  //   const result = await axios.post("/api/shack/searchShacks", {
  //     filter,
  //   });
  //   setShacks(result.data);
  // }

  // useEffect(() => {
  //   getSearchedShacks(filter);
  // }, [filter]);

  //           import prisma from "../../../lib/prisma.ts";

  // export default async (req, res) => {
  //   const data = req.body.filter;

  //   try {
  //     const result = await prisma.cabane.findMany(
  // {
  //   where: {
  //     OR: [
  //       {
  //         description: {
  //           contains: data,
  //           mode: "insensitive",
  //         },
  //       },
  //       {
  //         title: {
  //           contains: data,
  //           mode: "insensitive",
  //         },
  //       },
  //     ],
  //   },
  // },
  // {
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  // }
  //     );
  //     res.status(200).json(result);
  //   } catch (err) {
  //     res.status(400).json({ err: "Error while searching shacks." });
  //   }
  // };

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
