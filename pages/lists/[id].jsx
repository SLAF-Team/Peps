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
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const notifications = useNotifications();
  const [filter, setFilter] = useState("");
  const [lists, setLists] = useState(recipes);

  async function deleteList() {
    if (window.confirm("Souhaitez vous supprimer cette liste?")) {
      const result = await axios.delete(`/api/list/delete/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    router.push("/lists");
  }

  const handleDeleteList = () => {
    //notif
    deleteList();
    //notif
  };

  const handleSelect = (event) => {
    setFilter(event);
  };

  // async search fonction
  const getRecipes = async (data) => {
    try {
      const result = await axios.post(`/api/recipe/searchRecipes`, {
        ...data,
      });
      setLists(result.data);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    console.log(filter);
    const data =
      filter === "like"
        ? {
            orderBy: {
              likes: {
                _count: "asc",
              },
            },
            where: {
              lists: {
                some: { id: parseInt(listId) },
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
          }
        : {
            orderBy: {
              comments: {
                _count: "desc",
              },
            },
            where: {
              lists: {
                some: { id: parseInt(listId) },
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
          };
    getRecipes(data);
  }, [filter]);

  return (
    <>
      <UserList
        user={recipes[0].lists.filter((list) => list.id == listId)[0]}
        color="#26c485"
      />
      <FilterSelector left={recipes.length} handleSelect={handleSelect} />
      <div className={classes.cards}>
        <div className="row">
          {lists.map((recipe) => (
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
  const allRecipes = await prisma.recipe.findMany({
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
  return {
    props: {
      recipes: allRecipes,
      listId: id,
    },
  };
}

export default Profile;
