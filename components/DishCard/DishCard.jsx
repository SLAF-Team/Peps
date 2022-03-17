import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const DishCard = (props) => {
    const dish = props.dish;
    const token = Cookies.get('token');
    const router = useRouter();

    async function deleteDish() {
        if (window.confirm("Souhaitez vous supprimer ce plat?")) {
          await axios.delete(`/api/dish/${dish?.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          router.push("/dishs");
        }
      }

    return (
        <div>
            <h1>Titre : {dish.title}</h1>
            <p>Description : {dish.description}</p>
            <button onClick={deleteDish} >
                Supprimer
            </button>
            <button onClick={editDish}>
                modifier
            </button>
            <div>
                {dish.recipes.map(recipe => (
                    <p>{recipe.name}</p>
                ))}
            </div>
        </div>
    );
};

export default DishCard;