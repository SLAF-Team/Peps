import ListsList from "../ListsList";
import { useUserContext } from "../../../context/UserContext";
import { Modal } from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ButtonForm from "../../ButtonForm";
import Cookies from "js-cookie";

const ListForm = ({ lists, recipe }) => {
  const formRef = useRef();
  const { user } = useUserContext();
  const [opened, setOpened] = useState(false);
  const token = Cookies.get("token");
  const [userLists, setUserLists] = useState(null);

  const handleClick = () => {
    setOpened(true);
  };

  useEffect(() => {
    if (user) {
      setUserLists(user.lists);
    }
  }, []);

  async function addNewList(params) {
    const { addName } = formRef.current;
    const name = addName.value;
    const result = await axios.post(
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
    console.log(result);
  }

  return (
    <>
      <button onClick={handleClick}>Ajouter à une liste</button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form ref={formRef}>
          <p>Ajouter à une nouvelle liste</p>
          <input
            type="text"
            name="addName"
            size="40"
            placeholder="Ta nouvelle liste"
          />
          <ButtonForm onClick={() => addNewList()} label="Créer ma liste" />
        </form>
        <p>Utiliser une liste existante</p>
        {userLists && userLists.map((list) => <p>{list.name}</p>)}
        <ButtonForm onClick={() => editList()} label="Valider mon choix" />
        {/* {ajouter un label avec id (checkbox comme tag)} */}
      </Modal>
      <ListsList lists={lists} />
    </>
  );
};

export default ListForm;
