import { useState } from "react";
import axios from "axios";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import Cookies from "js-cookie";
import classes from "./AddRecipesTags.module.css";
import Button from "../../Button";
import { MultiSelect } from "@mantine/core";

const AddRecipesTags = ({ recipe, tags }) => {
  const [value, setValue] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const token = Cookies.get("token");
  const tagsList = [];
  const tagsSelect = tags.map((tag) => {
    return { value: tag.id, label: tag.name };
  });

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
    addTagsToRecipe(newValue);
  };

  const handleTags = (e) => {
    setValue(e);
  };

  const items = tags
    ? tags.map((tag, index) => (
        <Checkbox
          label={tag.name}
          key={tag.id}
          checked={tag.checked}
          onChange={(event) =>
            handlers.setItemProp(index, "checked", event.currentTarget.checked)
          }
        />
      ))
    : null;

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
          ? tags.map((tag) => (
              <Checkbox value={tag.id.toString()} label={tag.name} />
            ))
          : null}
      </CheckboxGroup>{" "}
      <MultiSelect
        data={tagsSelect}
        label="Tags"
        onChange={(e) => handleTags(e)}
        description="Choisis un ou plusieurs Tags pour identifier ta recette"
        maxDropdownHeight={160}
        required
      />
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
