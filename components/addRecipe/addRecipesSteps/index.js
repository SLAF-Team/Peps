import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
    <div>
      <form ref={formRef}>
        <input
          type="text"
          name="addSteps"
          size="40"
          placeholder="indique ici tes étapes"
        />
        <button disabled={disable} onClick={() => addRecipeSteps()}>
          Ajouter mes étapes
        </button>
      </form>
    </div>
  );
};

export default AddRecipesSteps;
