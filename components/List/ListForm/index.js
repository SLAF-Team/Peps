import ListsList from "../ListsList";
import { useUserContext } from "../../../context/UserContext";
import { Modal } from "@mantine/core";
import { useState, useRef } from "react";
import axios from "axios";
import Button from "../../Button";
import ButtonForm from "../../ButtonForm";
import Cookies from "js-cookie";
import styles from "./ListForm.module.css";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const ListForm = ({ lists, recipe, setSubmitted }) => {
  const formRef = useRef();
  const { user } = useUserContext();
  const [opened, setOpened] = useState(false);
  const token = Cookies.get("token");
  const [value, setValue] = useState([]);
  const notifications = useNotifications();
  const router = useRouter();

  const handleClick = () => {
    setOpened(true);
  };

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
    router.push(`/recipes/${recipe.id}`);
    setSubmitted(true);
    notifications.showNotification({
      message: "Votre liste a bien été créée",
      color: "green",
    });
    setOpened(false);
    setSubmitted(false);
  }

  // edit list
  async function editList(data) {
    const result = await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        lists: {
          connect: data,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
    notifications.showNotification({
      message: "Votre liste a bien été mise à jour",
      color: "green",
    });
    setSubmitted(false);
  }

  const handleEditClick = () => {
    const newValue = [];
    value.map((element) => newValue.push({ id: parseInt(element) }));
    editList(newValue);
  };

  return (
    <>
      <ListsList lists={lists} />
      <div className={styles.form}>
        <a href="" className={styles.btn} onClick={handleClick}>
          Ajouter
        </a>
      </div>
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
