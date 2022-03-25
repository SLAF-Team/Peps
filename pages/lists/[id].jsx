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
import { CheckboxGroup, Checkbox } from "@mantine/core";
import ButtonSettings from "../../components/ButtonSettings";

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
  const [value, setValue] = useState([]);



  // initial checkbox value

  // const initialValue = []
  // list? list[0].recipes.map((recipe) => initialValue.push(recipe.id.toString())) : null;
  // console.log("initialValue");
  // console.log(initialValue)

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
    let dataFilter = filtre === "comment" ? "comments" : "likes";
    let data = {
      where: { id: parseInt(id) },
      include: {
        recipes: {
          include: {
            _count: { select: { likes: true, comments: true } },
          },
          orderBy: {
            [dataFilter]: {
              _count: "asc",
            },
          },
        },
        user: { select: { name: true, id: true } },
      },
    };
    searchList(data);
  }

  // update list bloc

  const handleName = (e) => {
    setNameChange(e.target.value);
  };

  const editList = async (event) => {
    event.preventDefault();
    const data = [];
    value.map((element) => data.push({ id: parseInt(element) }));
    const result = await axios.put(
      "/api/list/editList",
      {
        id: parseInt(id),
        name: nameChange,
        recipes: {
          disconnect: data,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    notifications.showNotification({
      title: "Bravo !",
      message: "Votre liste a bien été mise à jour",
      color: "green",
    });
    setOpened(false);
    getList(filter);
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

  console.log(list);

  async function deleteList() {
    if (window.confirm("Souhaitez vous supprimer cette liste?")) {
      await axios.delete(`/api/list/delete/${parseInt(id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/profile?list=true");
    }
  }

  const handleDeleteList = () => {
    deleteList();
    notifications.showNotification({
      title: "Bravo !",
      message: "Votre liste a bien été supprimée",
      color: "green",
    });
  };

  return (
    <>
      {list && (
        <>
          <UserList user={list[0]} color="#26c485" />
          {auth && (
            <>
              <Button
                label="Supprimer"
                type="danger"
                handleClick={() => handleDeleteList()}
                href="#"
                className={classes.button}
              />
              <br></br>
              <ButtonSettings
                label="Editer"
                type="warning"
                handleClick={() => setOpened(true)}
                href="#"
                className={classes.button}
              />
            </>
          )}
          <FilterSelector left={recipes?.length} handleSelect={handleSelect} />
          <div className={classes.cards}>
            <div className="row">
              {recipes?.map((recipe) => (
                <RecipeCard
                  recipe={recipe}
                  key={recipe.id}
                  like_count={recipe?._count?.likes}
                  comment_count={recipe?._count?.comments}
                  col="col-3 col-6-sm"
                />
              ))}
            </div>
          </div>
          <Modal opened={opened} onClose={() => setOpened(false)}>
            <form onSubmit={editList}>
              <label>Nom</label> <br />
              <input
                name="listName"
                type="text"
                ref={list.name}
                onChange={handleName}
              />
              <CheckboxGroup
                // defaultValue={initialValue}
                value={value}
                onChange={setValue}
                label="Retirer des recettes"
                description=""
                required
              >
                {list[0].recipes ? (
                  list[0].recipes.map((recipe) => (
                    <Checkbox
                      value={recipe.id.toString()}
                      label={recipe.name}
                    />
                  ))
                ) : (
                  <p>Tu n'as pas encore de liste</p>
                )}
              </CheckboxGroup>
              <button type="submit">J'édite</button>
            </form>
            <Button
              label="Ajouter à d'autres recettes"
              type="success"
              href="/recipes"
              className={classes.button}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Profile;
