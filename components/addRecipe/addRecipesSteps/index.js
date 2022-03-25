import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./AddRecipesSteps.module.css";
import Button from "../../Button";
import { Textarea } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

const AddRecipesStep = ({ recipe }) => {
  const notifications = useNotifications();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);

  async function addRecipeStep(params) {
    const { addStep } = formRef.current;
    const step = addStep.value;
    if (!step) {
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
          steps: {
            create: [
              {
                text: step,
              },
            ],
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
    }
  }

  return (
    <div className={classes.block}>
      <form ref={formRef}>
        <Textarea
          type="text"
          name="addStep"
          placeholder="Indiquez la description de votre étape"
          autosize
          minRows={1}
        />
        {submitted ? (
          <p>Ajoutée !</p>
        ) : (
          <div className={classes.button}>
            <Button
              label="Valider mon étape"
              handleClick={() => addRecipeStep()}
              href=""
              type="success"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRecipesStep;
