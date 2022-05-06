import { useState } from "react";
import axios from "axios";
import { MultiSelect } from "@mantine/core";
import Cookies from "js-cookie";
import classes from "./EditRecipesTags.module.css";
import Button from "../../Button";

const EditRecipesTags = ({ recipe, tags }) => {
  const [submitted, setSubmitted] = useState(false);
  const token = Cookies.get("token");
  const inputTags = [];
  recipe.tags.map((element) => inputTags.push(element.id.toString()));
  const [tagValue, setTagValue] = useState(inputTags);

  const tagsData = [];
  tags.map((element) =>
    tagsData.push({ value: element.id.toString(), label: element.name })
  );

  async function addTagsToRecipe(inputData, data) {
    await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
        tags: {
          disconnect: inputData,
          connect: data,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmitted(true);
  }

  const handleClick = () => {
    const inputValue = [];
    inputTags.map((element) => inputValue.push({ id: parseInt(element) }));
    const newValue = [];
    tagValue.map((element) => newValue.push({ id: parseInt(element) }));
    addTagsToRecipe(inputValue, newValue);
  };

  return (
    <div className={classes.form}>
      {submitted ? (
        <MultiSelect
          value={tagValue}
          onChange={setTagValue}
          data={tagsData}
          searchable
          clearable
          disabled
        />
      ) : (
        <MultiSelect
          value={tagValue}
          onChange={setTagValue}
          data={tagsData}
          searchable
          clearable
        />
      )}
      <div className={classes.button}>
        {submitted ? null : (
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

export default EditRecipesTags;
