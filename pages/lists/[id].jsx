import { useState, useEffect } from "react";
import UserList from "../../components/UserList";
import styles from "./Lists.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import FilterSelector from "../../components/FilterSelector";
import axios from "axios";

const Profile = ({ recipes, listId }) => {
  const [style, setStyle] = useState(false);
  const [filter, setFilter] = useState("");
  const [lists, setLists] = useState(recipes);

  const handleClickLeft = () => {
    setStyle(false);
  };

  const handleClickRight = () => {
    setStyle(true);
  };

  const handleSelect = (event) => {
    setFilter(event);
  };

  // async function getSearchedRecipes(filter) {
  //   const result = await axios.post("/api/recipe/filterRecipes", {
  //     filter,
  //     listId,
  //   });
  //   setLists(result);
  // }

  // useEffect(() => {
  //   getSearchedRecipes(filter);
  // }, [filter]);

  return (
    <>
      <UserList
        user={recipes[0].lists.filter((list) => list.id == listId)[0].user}
        color="#26c485"
      />
      <FilterSelector left={recipes.length} handleSelect={handleSelect} />
      <div className={styles.cards}>
        <div className="row">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} col="col-3" />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const allRecipes = await prisma.recipe.findMany({
    orderBy: {
      comments: {
        _count: "asc",
      },
    },
    where: {
      lists: {
        some: { id: parseInt(id) },
      },
    },
    include: {
      lists: {
        select: { id: true, user: { select: { name: true, email: true } } },
      },
      _count: { select: { likes: true } },
      _count: { select: { comments: true } },
    },
  });
  // const allLists = await prisma.list.findUnique({
  //   where: { id: parseInt(id) },
  //   include: {
  //     user: { select: { name: true } },
  //     recipes: {
  //       select: {
  //         id: true,
  //         name: true,
  //         imageUrl: true,
  //         _count: { select: { likes: true } },
  //         _count: { select: { comments: true } },
  //       },
  //     },
  //   },
  //   orderBy: {
  //     comments: {
  //       count: "asc",
  //     },
  //   },
  // });
  return {
    props: {
      recipes: allRecipes,
      listId: id,
    },
  };
}

export default Profile;
