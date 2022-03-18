import { useState } from "react";
import axios from "axios";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import Cookies from "js-cookie";
import classes from "./AddRecipesTags.module.css";
import Button from "../../Button";

const AddRecipesTags = ({ recipe, tags }) => {
  const [value, setValue] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const token = Cookies.get("token");

  async function addTagsToRecipe(data) {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        tags: {
          connect: data,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

  const handleClick = () => {
    const newValue = [];
    value.map((element) => newValue.push({ id: parseInt(element) }));
    addTagsToRecipe(newValue);
  };

  return (
    <div className={classes.form}>
      <CheckboxGroup
        value={value}
        onChange={setValue}
        color="cyan"
        label="Tags"
        description="Choisis un ou plusieurs Tags pour identifier ta recette"
        required
      >
        {tags
          ? tags.map((tag) => <Checkbox value={tag.id} label={tag.name} />)
          : null}
      </CheckboxGroup>
      <div className={classes.button}>
        {submitted ? (
          <p>Ajouté!</p>
        ) : (
          <Button
            label="Valider mes tags"
            type="success"
            handleClick={handleClick}
            href="#"
          />
        )}
      </div>
    </div>
  );
};

export default AddRecipesTags;
