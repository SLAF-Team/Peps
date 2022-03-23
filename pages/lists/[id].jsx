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

const Profile = () => {
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const { query } = useRouter();
  const [recipes, setRecipes] = useState(null);
  const { id } = query;
  const [filter, setFilter] = useState("like");
  const [list, setList] = useState(recipes);
  const notifications = useNotifications();

  //
  const searchList = async (data) => {
    try {
      const result = await axios.post(`/api/list/searchLists`, {
        ...data,
      });
      setList(result.data);
      setRecipes(result.data[0].recipes);
    } catch (err) {
      console.log("error");
    }
  };
  // getlist
  async function getList(filtre) {
    let coucou = "likes";
    if (filtre === "comment") {
      coucou = "comments";
    }
    let data = {
      where: { id: parseInt(id) },
      include: {
        recipes: {
          include: {
            _count: { select: { likes: true, comments: true } },
          },
          orderBy: {
            [coucou]: {
              _count: "asc",
            },
          },
        },
        user: { select: { name: true } },
      },
    };
    searchList(data);
  }

  // mettre axios
  //   const List = await prisma.list.findUnique({
  //     where: { id: parseInt(id) },
  //     include: {
  //       recipes: {
  //         include: {
  //           _count: { select: { likes: true, comments: true } },
  //         },
  //         orderBy: {
  //           [coucou]: {
  //             _count: "asc",
  //           },
  //         },
  //       },
  //       user: { select: { name: true } },
  //     },
  //   });
  // setList(List)
  // setRecipes(List.recipes)
  // }

  const handleSelect = (event) => {
    setFilter(event);
  };

  useEffect(() => {
    getList(filter);
  }, [filter]);

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

  // gérer son filtre => il marche, mais pas encore efficace
  // gérer delete
  // gérer update

  console.log("recipes");
  console.log(recipes);

  console.log(checkAuthorAuth(user, list));

  return (
    <>
      {/* <UserList
        user={recipes[0].lists.filter((list) => list.id == listId)[0]}
        color="#26c485"
      /> */}
      <FilterSelector left={recipes?.length} handleSelect={handleSelect} />
      <div className={classes.cards}>
        <div className="row">
          {recipes?.map((recipe) => (
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
  const List = await prisma.list.findUnique({
    where: { id: parseInt(id) },
    include: {
      recipes: {
        include: {
          _count: { select: { likes: true, comments: true } },
        },
        orderBy: {
          likes: {
            _count: "asc",
          },
        },
      },
      user: { select: { name: true } },
    },
  });
  console.log(List);
  return {
    props: {
      list: List,
    },
  };
}

export default Profile;
