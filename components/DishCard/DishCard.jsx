import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const DishCard = (props) => {
    const dish = props.dish;
    const token = Cookies.get('token');
    const router = useRouter();
    const formRef = useRef();
    const [titleChange, setTitleChange] = useState();
    const [descriptionChange, setDescriptionChange] = useState();


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
            id: dish.id,
            title: titleChange,
            description:  descriptionChange,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }


        const handleTitle = (e) => {
            setTitleChange(e.target.value);
        };

        
        const handleDescription = (e) => {
            setDescriptionChange(e.target.value);
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
                    defaultValue={dish.title}
                    onChange={handleTitle}
                />
                <label>Description</label>
                <textarea
                    name="shackDescription"
                    type="text"
                    style={{ width: "100%", height: "100px" }}
                    defaultValue={dish.description}
                    onChange={handleDescription}
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
