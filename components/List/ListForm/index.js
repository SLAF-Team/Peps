import ListsList from "../ListsList";
import { useUserContext } from "../../../context/UserContext";
import { Modal } from "@mantine/core";
import { useState, useRef } from "react";
import axios from "axios";
import Button from "../../Button";
import Cookies from "js-cookie";
import classes from "./ListForm.module.css";
import { CheckboxGroup, Checkbox } from "@mantine/core";

const ListForm = ({ lists, recipe }) => {
  const formRef = useRef();
  const { user } = useUserContext();
  const [opened, setOpened] = useState(false);
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState([]);

  const handleClick = () => {
    setOpened(true);
  };

  // Add new

  async function addNewList(params) {
    const { addName } = formRef.current;
    const name = addName.value;
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
    setSubmitted(true);
    setUserLists(user.lists);
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
  }

  const handleEditClick = () => {
    const newValue = [];
    value.map((element) => newValue.push({ id: parseInt(element) }));
    editList(newValue);
  };

  return (
    <>
      <ListsList lists={lists} />
      <div className={classes.center}>
        <button className={classes.btn} onClick={handleClick}>
          Ajouter à une liste
        </button>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <p>Ajouter à une nouvelle liste</p>
        <form ref={formRef}>
          <input
            type="text"
            name="addName"
            size="40"
            placeholder="Ta nouvelle liste"
          />
          <div className={classes.button}>
            {submitted ? (
              <p>Ajoutée !</p>
            ) : (
              <Button
                label="Créer ma liste"
                type="success"
                handleClick={() => addNewList()}
                href="#"
              />
            )}
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
              <Checkbox value={list.id.toString()} label={list.name} />
            ))
          ) : (
            <p>Tu n'as pas encore de liste</p>
          )}
        </CheckboxGroup>
        <div className={classes.button}>
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
