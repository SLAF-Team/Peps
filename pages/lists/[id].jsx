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
import { Modal } from "@mantine/core";

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
  const [auth, setAuth] = useState(false);
  const [opened, setOpened] = useState(false);
  const [nameChange, setNameChange] = useState();

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
        user: { select: { name: true, id: true } },
      },
    };
    searchList(data);
  }

  //update list

  const handleName = (e) => {
    setNameChange(e.target.value);
  };

  const editList = async (event) => {
    console.log(nameChange)
    event.preventDefault();
    const result = await axios.put(
      "/api/list/editList",
      {
        id: parseInt(id),
        name: nameChange,
        // un truc sur les recettes disconnect
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(result)
  };

  useEffect(() => {
    if (!user && !list) {
      setAuth(checkAuthorAuth(user, list));
    }
  }, [list, user]);

  useEffect(() => {
    getList("like");
  }, [id]);

  // Filter

  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handleSelect = (event) => {
    setFilter(event);
  };

  // async function deleteList() {
  //   if (window.confirm("Souhaitez vous supprimer cette liste?")) {
  //     const result = await axios.delete(`/api/list/delete/${parseInt(id)}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //   }
  //   console.log(result)
  //   router.push("/profile?list=true");
  // }

  // const handleDeleteList = () => {
  //   deleteList();
  //   notifications.showNotification({
  //     title: "Bravo !",
  //     message: "Votre liste a bien été supprimée",
  //     color: "green",
  //   });  };

  return (
    <>
      {list && <UserList user={list[0]} color="#26c485" />}
      <FilterSelector left={recipes?.length} handleSelect={handleSelect} />
      <div className={classes.cards}>
        <div className="row">
          {recipes?.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} col="col-3" />
          ))}
        </div>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={editList}>
          <label>Name</label> <br />
          <input
            name="listName"
            type="text"
            defaultValue={list?.name}
            onChange={handleName}
          />
          <button type="submit">J'édite</button>
        </form>
      </Modal>
      {auth && (
        <>
          {/* <Button
            label="Supprimer"
            type="danger"
            handleClick={() => handleDeleteList()}
            href="#"
            className={classes.button}
          />
        <br></br> */}
        <Button
          label="Editer"
          type="warning"
          handleClick={() => setOpened(true)}
          href="#"
          className={classes.button}
        />
        </>
      )}
    </>
  );
};

export default Profile;
