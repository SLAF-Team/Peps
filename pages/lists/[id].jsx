import { useState, useEffect } from "react";
import UserList from "../../components/UserList";
import classes from "./Lists.module.css";
import RecipeCard from "../../components/recipeCard";
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
  const [list, setList] = useState(null);
  const notifications = useNotifications();

  //fix userlist
  // gérer delete
  // gérer update

  // search list + call axios
  async function searchList(data) {
    try {
      const result = await axios.post(`/api/list/searchLists`, {
        ...data,
      });
      setList(result.data);
      setRecipes(result.data[0].recipes);
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    getList("like");
  }, [id]);

  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handleSelect = (event) => {
    setFilter(event);
  };

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

  console.log(list)

  return (
    <>
{      list && <UserList
        user={list[0]}
        color="#26c485"
      />}
      <FilterSelector left={recipes?.length} handleSelect={handleSelect} />
      <div className={classes.cards}>
        <div className="row">
          {recipes?.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} col="col-3" />
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

export default Profile;
