import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const DishCard = (props) => {
    const dishElement = props.dish;
    const token = Cookies.get('token');
    const router = useRouter();
    // dishElement.recipes.forEach(recipe => {
    //     console.log(recipe.name)
    // })


    dishElement?.recipes.map(recip => {
        console.log(recip)
    })


    async function deleteDish() {
        if (window.confirm("Souhaitez vous supprimer ce plat?")) {
          await axios.delete(`/api/dish/${dishElement?.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          router.push("/dishs/");
        }
      }

    
    return (
        <div>
            <h1>Titre : {dishElement.title}</h1>
            <p>Description : {dishElement.description}</p>
            <button onClick={deleteDish} >
                Supprimer
            </button>
            <div>
                {dishElement.recipes.map(recip => (
                    <p>{recip.name}</p>
                ))}
            </div>

        </div>
    );
};

export default DishCard;