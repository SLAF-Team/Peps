import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./EditRecipesSteps.module.css";
import Button from "../../Button";
import { Textarea } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

const EditRecipesStep = ({ recipe, element }) => {
  const inputStep = element.text;
  const inputStepId = element.id;
  const [stepValue, setStepValue] = useState(inputStep);
  const notifications = useNotifications();
  const formRef = useRef();
  const token = Cookies.get("token");
  const [submitted, setSubmitted] = useState(false);

  async function editRecipeStep() {
    const step = stepValue;
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
            update: {
              where: {
                id: inputStepId,
              },
              data: {
                text: stepValue,
              },
            },
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
    }
  }

  async function deleteRecipeStep() {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        steps: {
          deleteMany: [
            {
              id: inputStepId,
            },
          ],
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

  return (
    <div className={classes.block}>
      <form ref={formRef}>
        {submitted ? (
          <Textarea
            type="text"
            autosize
            minRows={1}
            value={stepValue}
            onChange={(event) => setStepValue(event.currentTarget.value)}
            disabled
          />
        ) : (
          <Textarea
            type="text"
            autosize
            minRows={1}
            value={stepValue}
            onChange={(event) => setStepValue(event.currentTarget.value)}
          />
        )}
        {submitted ? null : (
          <div className={classes.button}>
            <Button
              label="Modifier"
              handleClick={() => editRecipeStep()}
              href="#"
              type="success"
            />
          </div>
        )}
        <div className={classes.button}>
          {submitted ? null : (
            <Button
              label="Supprimer"
              type="danger"
              handleClick={() => deleteRecipeStep()}
              href="#"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default EditRecipesStep;
