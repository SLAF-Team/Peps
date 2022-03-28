import ListsList from "../ListsList";
import { useUserContext } from "../../../context/UserContext";
import { Modal } from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "../../Button";
import Cookies from "js-cookie";
import styles from "./ListForm.module.css";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

const ListForm = ({ lists, recipe, onCreate }) => {
  const formRef = useRef();
  const { user, setUser } = useUserContext();
  const [opened, setOpened] = useState(false);
  const token = Cookies.get("token");
  const [value, setValue] = useState([]);
  const [oldValue, setOldValue] = useState([]);
  const notifications = useNotifications();
  const filteredLists = recipe.lists.filter((list) => list.userId === user?.id);

  console.log("filteredLists");
  console.log(filteredLists);

  console.log(value);
  console.log(oldValue);
  const handleClick = () => {
    setOpened(true);
  };

  // refreshcontext
  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }

  useEffect(() => {
    if (filteredLists.length > 0) {
      const oldLists = [];
      filteredLists.map((list) => oldLists.push(list.id.toString()));
      setValue(oldLists);
      setOldValue(oldLists);
    }
  }, [user, recipe]);

  // Add new
  async function addNewList(params) {
    const { addName } = formRef.current;
    const name = addName.value;
    if (!name) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire",
        message: "Votre liste nécessite un nom",
        color: "red",
      });
    }
    await axios.post(
      "/api/list/addList",
      {
        userId: user.id,
        name,
        recipes: {
          connect: { id: recipe.id },
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    onCreate();
    notifications.showNotification({
      message: "Votre liste a bien été créée",
      color: "green",
    });
    setOpened(false);
    getUser();
  }

  // edit list
  async function editList(oldData, data) {
    await axios.put(
      "/api/recipe/editRecipesList",
      {
        id: recipe.id,
        lists: {
          disconnect: oldData,
          connect: data,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    notifications.showNotification({
      message: "Votre liste a bien été mise à jour",
      color: "green",
    });
    onCreate();
    setOpened(false);
  }

  const handleEditClick = () => {
    const newValue = [];
    value.map((element) => newValue.push({ id: parseInt(element) }));
    const oldValueList = [];
    oldValue.map((element) => oldValueList.push({ id: parseInt(element) }));
    editList(oldValueList, newValue);
  };

  return (
    <>
      <ListsList lists={lists} />
      {user ? (
        <div className={styles.form}>
          <a href="#" className={styles.btn} onClick={() => handleClick()}>
            Ajouter
          </a>
        </div>
      ) : null}
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <p>Ajouter à une nouvelle liste</p>
        <form ref={formRef}>
          <input
            type="text"
            name="addName"
            size="40"
            placeholder="Ta nouvelle liste"
            className={styles.field}
          />
          <div className={styles.button}>
            <Button
              label="Créer ma liste"
              type="success"
              handleClick={() => addNewList()}
              href="#"
            />
          </div>
        </form>
        <p>Utiliser une liste existante</p>
        <CheckboxGroup
          value={value}
          onChange={setValue}
          label="Utiliser une liste existante"
          description=""
          required
        >
          {user?.lists ? (
            user?.lists.map((list) => (
              <Checkbox
                value={list.id.toString()}
                label={list.name}
                key={list.id}
              />
            ))
          ) : (
            <p>Tu n'as pas encore de liste</p>
          )}
        </CheckboxGroup>
        <div className={styles.button}>
          <Button
            label="Valider mon choix"
            type="success"
            handleClick={() => handleEditClick()}
            href="#"
          />
        </div>
      </Modal>
    </>
  );
};

export default ListForm;
