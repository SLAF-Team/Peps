import ListsList from "../ListsList";
import { useUserContext } from "../../../context/UserContext";
import { Modal } from "@mantine/core";
import { useState, useRef } from "react";
import axios from "axios";
import ButtonForm from "../../ButtonForm";
import Cookies from "js-cookie";

const ListForm = ({ lists }) => {
  const formRef = useRef();
  const { user } = useUserContext();
  const [opened, setOpened] = useState(false);
  const token = Cookies.get("token");

  const handleClick = () => {
    setOpened(true);
  };

  //   model List {
  //   id       Int      @id @default(autoincrement())
  //   name     String
  //   user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   userId   Int
  //   recipes            Recipe[]                   @relation("_ListAndRecipes")
  // }
  async function addNewList(params) {
    const { addName } = formRef.current;
    const name = addName.value;
    await axios.put(
      "/api/list/addList",
      {
        userId: user.id,
        name,
      },
      // recipeId: recipe.id - create relation,

      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  return (
    <>
      <button onClick={handleClick}>Ajouter à une liste</button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <form ref={formRef}>
          <p>Créer une nouvelle liste</p>

          <input
            type="text"
            name="addName"
            size="40"
            placeholder="Nom de ta liste"
          />
          <ButtonForm onClick={() => addNewList()} label="Ajouter à ma liste"/>
        </form>
        <p>Utiliser une liste existante</p>
        {/* Toutes mes listes */}
        {/* <button onClick={() => addRecipeSteps()}>
          Ajouter à ces listes
        </button> */}
      </Modal>
      <ListsList lists={lists} />
    </>
  );
};

export default ListForm;
