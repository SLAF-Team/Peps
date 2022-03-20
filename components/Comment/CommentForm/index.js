import React from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./CommentForm.module.css";
import Button from "../../Button";

const CommentForm = ({ user, recipe }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);

  async function addComment(params) {
    const { addText } = formRef.current;
    const text = addText.value;
    const result = await axios.post(
      "/api/comment/addComment",
      {
        recipeId: recipe.id,
        userId: user.id,
        text,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

  return (
    <form className={classes.form} ref={formRef}>
      <div className={classes.setups_small}>
        <div className={classes.setup_small}>
          <label>Commentaire</label>
          <input className={classes.input_small} name="addText" type="text" />
        </div>
        <div className={classes.button}>
          {submitted ? (
            <p>Ajouté!</p>
          ) : (
            <Button
              label="Commenter"
              type="success"
              handleClick={() => addComment()}
              href="#"
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
