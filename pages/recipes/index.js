import React from "react";
import RecipeCard from "../../components/recipeCard/index.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Recipe.module.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";

const Recipes = ({ recipes, tags, countries, types, ingredients }) => {
  const [filterTag, setFilterTag] = useState([]);
  const [recipes, setRecipes] = useState(recipes);

  useEffect(() => {
    setRecipes(getRecipes());
  }, [filterTag]);

  const dataTags = [];
  tags?.map((tag) => dataTags.push({ value: tag.id, label: tag.name }));

    const getRecipes = async () => {
      try {
        const result = await axios.get(`/api/recipe/getRecipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(result.data);
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
//       {
//         where: {
//           OR: [
//             {
//               description: {
//                 contains: data,
//                 mode: "insensitive",
//               },
//             },
//             {
//               title: {
//                 contains: data,
//                 mode: "insensitive",
//               },
//             },
//           ],
//         },
//       },
//       {
//         orderBy: {
//           createdAt: "asc",
//         },
//       }
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
