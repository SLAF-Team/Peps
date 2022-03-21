import { useState, useRef } from "react";
import axios from "axios";
import Button from "../../Button";
import Cookies from "js-cookie";
import classes from "./AddList.module.css";

const AddList = ({user}) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);

  // Add new
  async function addNewList(params) {
    const { addName } = formRef.current;
    const name = addName.value;
    await axios.post(
      "/api/list/addList",
      {
        userId: user.id,
        name,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

  return (
    <>
        <form ref={formRef}>
          <input
            type="text"
            name="addName"
            size="40"
            placeholder="nouvelle liste"
          />
          <div className={classes.button}>
            {submitted ? (
              <p>Ajoutée !</p>
            ) : (
              <Button
                label="Créer une liste"
                type="success"
                handleClick={() => addNewList()}
                href="#"
              />
            )}
          </div>
        </form>
    </>
  );
};

export default AddList;
