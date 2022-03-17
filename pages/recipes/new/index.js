import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";

const newRecipe = () => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [countries, setCountries] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [tags, setTags] = useState(null);
  const [types, setTypes] = useState(null);
  const { user } = useUserContext();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getAllCountries();
    getAllDishes();
    getAllTypes();
    getAllTags();
  }, []);

  // get regions
  async function getAllCountries() {
    const result = await axios.get("/api/country/getCountries");
    setCountries(result.data);
  }

  // get dish
  async function getAllDishes() {
    const result = await axios.get("/api/dish/getDishes");
    setDishes(result.data);
  }

  // get tags
  async function getAllTags() {
    const result = await axios.get("/api/tag/getTags");
    setTags(result.data);
  }

  // get types
  async function getAllTypes() {
    const result = await axios.get("/api/type/getTypes");
    setTypes(result.data);
  }

  // add Dish
  async function addNewDish(params) {
    setDisable(true);
    const {
      addName,
      addDescription,
      addCountry,
      addDish,
      addType,
      addTag,
      addImageUrl,
    } = formRef.current;
    const name = addName.value;
    const description = addDescription.value;
    const imageUrl = addImageUrl.value;
    const country = addCountry.value;
    const dish = addDish.value;
    const type = addType.value;
    // const tags = addTag.value;
    const cook = user;
    const result = await axios.post(
      "/api/recipe/addRecipe",
      {
        name,
        description,
        imageUrl,
        countryId: parseInt(country),
        cookId: parseInt(cook.id),
        dishId: parseInt(dish),
        typeId: parseInt(type),
        // tags: parseInt(tags),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    setRecipe(result.data);
  }

  return (
    <div>
      <form ref={formRef}>
        <div>
          <label>Name</label>
          <input name="addName" type="text" />
        </div>
        <div>
          <label>Description</label>
          <input name="addDescription" type="text" />
        </div>
        <div>
          <label>URL de l'image</label>
          <input name="addImageUrl" type="text" />
        </div>
        {dishes ? (
          <div>
            <label>Plat relié</label>
            <select name="addDish">
              {dishes.map((dish) => (
                <option value={dish.id} key={dish.id}>
                  {dish.title}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {types ? (
          <div>
            <label>Type de plat</label>
            <select name="addType">
              {types.map((type) => (
                <option value={type.id} key={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {tags ? (
          <div>
            <label>Tags</label>
            <select name="addTag">
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {countries ? (
          <div>
            <label>Pays</label>
            <select name="addCountry">
              {countries.map((country) => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <button
          disabled={disable}
          className="btn btn-primary my-3"
          onClick={() => addNewDish()}
        >
          Créer un plat
        </button>
      </form>
    </div>
  );
};

export default newRecipe;
