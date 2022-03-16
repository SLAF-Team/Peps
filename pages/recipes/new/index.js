import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import axios from "axios";
import prisma from "../../../lib/prisma.ts";
import Cookies from "js-cookie";

const newDish = () => {
  const formRef = useRef();
  const token = Cookies.get("token");
  const [disable, setDisable] = useState(false);
  const [countries, setCountries] = useState(null);

  // get regions
  async function getAllCountries() {
    const result = await axios.get("/api/country/getCountries");
    setCountries(result.data);
  }

  useEffect(() => {
    getAllCountries();
  }, []);

  // add Dish
  async function addNewDish(params) {
    setDisable(true);
    const { addName, addDescription, addCountry } = formRef.current;
    const name = addName.value;
    const description = addDescription.value;
    const country = addCountry.value;
    await axios.post(
      "/api/dish/addDish",
      {
        name,
        description,
        imageUrl,
        countryId: parseInt(country),
        regionId: parseInt(region),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDisable(false);
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

export async function getServerSideProps() {
  const allDishes = await prisma.dish.findMany();
  return {
    props: {
      dishes: allDishes,
    },
  };
}

export default newDish;
