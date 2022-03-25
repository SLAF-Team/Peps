import { useState } from "react";
import axios from "axios";
import { MultiSelect } from "@mantine/core";
import Cookies from "js-cookie";
import classes from "./AddRecipesTags.module.css";
import Button from "../../Button";

const AddRecipesTags = ({ recipe, tags }) => {
  const [submitted, setSubmitted] = useState(false);
  const token = Cookies.get("token");
  const [tagValue, setTagValue] = useState("");

  const tagsData = [];
  tags.map((element) =>
    tagsData.push({ value: element.id.toString(), label: element.name })
  );

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
    tagValue.map((element) => newValue.push({ id: parseInt(element) }));
    addTagsToRecipe(newValue);
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

export default AddRecipesTags;
