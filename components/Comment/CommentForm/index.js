import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./CommentForm.module.css";
import Button from "../../Button";
import Link from "next/link";
import { useNotifications } from "@mantine/notifications";

const CommentForm = ({ user, recipe, setSubmitted }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const notifications = useNotifications();

  useEffect(() => {
    setSubmitted(false);
  }, []);

  async function addComment(e) {
    e.preventDefault();
    const { addText } = formRef.current;
    const text = addText.value;
    if (!text) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire",
        message: "Votre commentaire ne peut être vide.",
        color: "red",
      });
    } else {
      await axios.post(
        "/api/comment/addComment",
        {
          recipeId: recipe.id,
          userId: user.id,
          text,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
      addText.value = "";
      notifications.showNotification({
        title: "Bravo!",
        message: "Votre commentaire a été publié avec succès",
        color: "green",
      });
    }
  }

  if (token != null) {
    return (
      <form
        className={classes.form}
        ref={formRef}
        onSubmit={() => addComment()}
      >
        <div className={classes.setups_small}>
          <div className={classes.profilepic}>
            <div
              className={classes.avatar}
              style={{ backgroundColor: "#ffd12f" }}
            >
              <span className={classes.letter}>
                {user?.name[0].toUpperCase()}
              </span>
            </div>
          </div>
          <div className={classes.setup_small}>
            <input className={classes.input_small} name="addText" type="text" />
            <div className={classes.button}>
              <Button label="Publier" type="alert" href="#" />
            </div>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <>
        <p>
          Veuillez vous{" "}
          <b>
            <a href="/login/">connecter</a>
          </b>{" "}
          pour écrire un commentaire
        </p>
      </>
    );
  }
};

export default CommentForm;
