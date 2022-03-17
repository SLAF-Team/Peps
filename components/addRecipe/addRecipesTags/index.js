import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import { CheckboxGroup, Checkbox } from '@mantine/core';


const AddRecipesTags = () => {
const [tags, setTags] = useState(null);
const [value, setValue] = useState([]);

async function getAllTags() {
  const result = await axios.get("/api/tag/getTags");
  setTags(result.data);
}

useEffect(() => {
  getAllTags();
}, []);

return (
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
  );
}

export default AddRecipesTags
