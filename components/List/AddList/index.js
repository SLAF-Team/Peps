import { useRef } from "react";
import axios from "axios";
import Button from "../../Button";
import Cookies from "js-cookie";
import classes from "./AddList.module.css";
import { useNotifications } from "@mantine/notifications";

const AddList = ({ user, onCreate }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const notifications = useNotifications();

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
    } else {
      const result = await axios.post(
        "/api/list/addList",
        {
          userId: user.id,
          name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notifications.showNotification({
        message: "Votre liste a bien été créée",
        color: "green",
      });
      onCreate();
    }
  }

  return (
    <>
      <form ref={formRef} className={classes.size}>
        <div className={classes.form}>
          <input
            type="text"
            name="addName"
            size="40"
            className={classes.field}
            placeholder="nouvelle liste"
          />
          <div className={classes.button}>
            <Button
              label="Créer une liste"
              type="success"
              handleClick={() => addNewList()}
              href="#"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddList;
