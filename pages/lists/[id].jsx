import { useState, useEffect } from "react";
import UserList from "../../components/UserList";
import classes from "./Lists.module.css";
import RecipeCard from "../../components/recipeCard";
import prisma from "../../lib/prisma.ts";
import FilterSelector from "../../components/FilterSelector";
import { checkAuthorAuth } from "../../lib/authfront";
import { useUserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import Cookies from "js-cookie";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";

const Profile = ({ list, recipes, listId }) => {
  const {user} = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const notifications = useNotifications();
  const [style, setStyle] = useState(false);
  const [filter, setFilter] = useState("");
  const [lists, setLists] = useState(recipes);

  const handleClickLeft = () => {
    setStyle(false);
  };

  const handleClickRight = () => {
    setStyle(true);
  };

  async function deleteList() {
      if (window.confirm("Souhaitez vous supprimer cette liste?")) {
        const result = await axios.delete(`/api/list/delete/${list?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      router.push('/lists')
      console.log(result);
    }

  const handleDeleteList = () => {
    //notif
    deleteList();
    //notif
  };

    const updateList = () => {};

  return (
    <>
      <UserList user={list} color="#26c485" />
      <FilterSelector left={list?.recipes.length} />
      <div className="row">
        {list?.recipes.map((recipe) => (
          <RecipeCard recipe={recipe} col="col-3" />
        ))}

        const handleSelect = (event) => {
    setFilter(event);
    console.log(recipes[0].lists.filter((list) => list.id == listId)[0]);
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
        user={recipes[0].lists.filter((list) => list.id == listId)[0]}
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
      {checkAuthorAuth(user, list) && (
        <>
          <Button
            label="Supprimer"
            type="danger"
            handleClick={() => handleDeleteList()}
            href="#"
            className={classes.button}
          />
          <br></br>
          <Button
            label="Editer"
            type="warning"
            handleClick={() => updateList()}
            href="#"
            className={classes.button}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const oneList = await prisma.list.findUnique({
    where: { id: parseInt(id) },
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
        select: {
          id: true,
          name: true,
          user: { select: { name: true, email: true } },
        },
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
      list: oneList,
      recipes: allRecipes,
      listId: id,
    },
  };
}

export default Profile;
