import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./AddRecipesSteps.module.css";
import Button from "../../Button";
import { Textarea } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

const AddRecipesSteps = ({ recipe }) => {
  const notifications = useNotifications();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function addRecipeSteps(params) {
    setDisable(true);
    const { addSteps } = formRef.current;
    const steps = addSteps.value;
    if (!steps) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire !",
        message: "Un ou plusieurs éléments sont manquants",
        color: "red",
      });
    } else {
      await axios.put(
        "/api/recipe/editRecipe",
        {
          id: recipe.id,
          steps,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDisable(false);
      setSubmitted(true);
    }
  }

  return (
    <div className={classes.block}>
      <form ref={formRef}>
        <Textarea
          type="text"
          name="addSteps"
          placeholder="Indiquez ici les étapes"
          autosize
          minRows={2}
        />
        {submitted ? (
          <p>Ajoutées !</p>
        ) : (
          <Button
            label="Valider mes étapes"
            handleClick={() => addRecipeSteps()}
            href=""
          />
        )}
      </form>
    </div>
  );
};

export default AddRecipesSteps;
