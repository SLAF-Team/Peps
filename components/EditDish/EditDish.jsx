import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import Modalform from "../Modalform";

export default function EditShack({ closeModal, dish }) {
  const { user } = useUserContext();
  const [disable, setDisable] = useState(false);
  const [id, setId] = useState("");
  const formRef = useRef();
  const token = Cookies.get("token");
  const router = useRouter();
  const display = false;

  useEffect(() => {
    setId(user.id);
  }, []);

  async function editShack(form) {
    setDisable(true);
    const { dishTitle, dishDescription, dishId } = form;
    const title = dishTitle;
    const description = dishDescription;
    const id = dishId;
    await axios.put(
      "/api/dish/editDish",
      {
        id: parseInt(dish?.id),
        title,
        description,
        id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    closeModal();
    router.push(`/dishes/`);
  }

  return (
    <Modalform
      title={dish?.title}
      description={dish?.description}
      disable={disable}
      closeModal={closeModal}
      dishFunction={editDish}
      displayNone={display}
    />
  );
}
