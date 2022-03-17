import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import { CheckboxGroup, Checkbox } from '@mantine/core';

const AddRecipesTags = ({recipe}) => {
const [tags, setTags] = useState(null);
const [value, setValue] = useState([]);

async function getAllTags() {
  const result = await axios.get("/api/tag/getTags");
  setTags(result.data);
}

useEffect(() => {
  getAllTags();
}, []);

  async function addTagsToRecipe() {
    const result = await axios.put(
      "/api/recipe/editRecipe",
      {
        id: recipe.id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(result)
  }

const handleClick = () => {
  addTagsToRecipe();
}

const assignCategories = await prisma.post.create({
  data: {
    title: "How to be Bob",
    categories: {
      create: [
        {
          assignedBy: "Bob",
          assignedAt: new Date(),
          category: {
            connect: {
              id: 9,
            },
          },
        },
        {
          assignedBy: "Bob",
          assignedAt: new Date(),
          category: {
            connect: {
              id: 22,
            },
          },
        },
      ],
    },
  },
});

return (
  <>
    <CheckboxGroup value={value} onChange={setValue}       
      color="cyan"
      label="Tags"
      description="Choisis un ou plusieurs Tags pour identifier ta recette"
      required
      >
      {tags? tags.map((tag) => (
          <Checkbox value={tag.id} label={tag.name}/>
        )) : null}
    </CheckboxGroup>
    <button onClick={handleClick}>Valider mon choix</button>
    </>
  );
}

export default AddRecipesTags
