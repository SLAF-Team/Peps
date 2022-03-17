import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../../context/UserContext";
import AddRecipesIngredients from "../../../components/addRecipe/addRecipesIngredients";
import AddRecipesTags from "../../../components/addRecipe/addRecipesTags";

const newRecipe = () => {
  const formRef = useRef();
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [countries, setCountries] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [types, setTypes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [count, setCount] = useState(0);

  console.log("recette");
  console.log(recipe);

  // clean usestate : idée - https://stackoverflow.com/questions/57305109/using-react-hooks-with-more-than-one-key-value-pair-in-state-object

  useEffect(() => {
    getAllCountries();
    getAllDishes();
    getAllTypes();
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

  // get types
  async function getAllTypes() {
    const result = await axios.get("/api/type/getTypes");
    setTypes(result.data);
  }

  // add Dish
  async function addNewRecipe(params) {
    setDisable(true);
    const {
      addName,
      addDescription,
      addCountry,
      addDish,
      addType,
      addImageUrl,
    } = formRef.current;
    const name = addName.value;
    const description = addDescription.value;
    const imageUrl = addImageUrl.value;
    const country = addCountry.value;
    const dish = addDish.value;
    const type = addType.value;
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
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
    setRecipe(result.data);
  }

  const handleClick = () => {
    setCount(count + 1);
  };

  console.log(count);

  return (
    <div>
      <h2>1ère étape : ajoute ta recette ! </h2>
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
          onClick={() => addNewRecipe()}
        >
          Créer un plat
        </button>
      </form>
      <h2>II - Ajoute tes ingrédients</h2>
      {/* {recipe ? <> */}
      <button onClick={handleClick}>Ajouter un ingrédient</button>
      {[...Array(count)].map((e, i) => {
        return <AddRecipesIngredients recipe={recipe} key={i} />;
      })}
      {/* </> : null} */}
      <h2>III - Décris les étapes de ta recette</h2>
      {recipe ? <addRecipesSteps recipe={recipe} /> : null}
      <h2>IV - Un peu de référencement...</h2>
      {/* {recipe ? <AddRecipesTags /> : null} */}
      <AddRecipesTags />
    </div>
  );
};

export default newRecipe;
