import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const DishCard = (props) => {
  const dish = props.dish;
  const token = Cookies.get("token");
  const router = useRouter();

  async function deleteDish() {
    if (window.confirm("Souhaitez vous supprimer ce plat?")) {
      await axios.delete(`/api/dish/${dish?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dishes/");
    }
  }


      async function editDish() {
        const result = await axios.put(
          "/api/dish/editDish",
          {
            title: dish.title,
            description:  dish.description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const [state, setState] = useState({
		dishTitle: dish.title,
		dishDescription: dish.description,
        });

      const handleValueChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

    return (
        <div>
            <h1>Titre : {dish.title}</h1>
            <p>Description : {dish.description}</p>
            <button onClick={deleteDish} >
                Supprimer
            </button>


            <form >
								<label>Title</label>
								<input
									name="shackTitle"
									type="text"
									value={state.dishTitle}
									onChange={handleValueChange}
								/>
								<label>Description</label>
								<textarea
									name="shackDescription"
									type="text"
									style={{ width: "100%", height: "100px" }}
									value={state.dishDescription}
									onChange={handleValueChange}
								/>
                                      <button type="submit" onClick={editDish}>
                                            J'édite
                                        </button>
					</form>



            <div>
                {dish.recipes.map(recipe => (
                    <p>{recipe.name}</p>
                ))}
            </div>
        </div>
    );

};

export default DishCard;
