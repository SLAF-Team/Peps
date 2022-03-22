import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from "./AddRecipesSteps.module.css";
import Button from "../../Button";

const AddRecipesSteps = ({ recipe }) => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);

  async function addRecipeSteps(params) {
    setDisable(true);
    const { addSteps } = formRef.current;
    const steps = addSteps.value;
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        steps,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
  }

  return (
    <div className={classes.block}>
      <form ref={formRef}>
        <input
          type="text"
          name="addSteps"
          placeholder="Indiquez ici les étapes"
          className={classes.input}
        />
        <Button
          label="Valider l'étape"
          handleClick={() => addRecipeSteps()}
          href=""
        />
      </form>
    </div>
  );
};

export default AddRecipesSteps;
