import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import prisma from "../../lib/prisma.ts";
import axios from 'axios';

const SelectedDish = ( { dish } ) => {
    
    const [id, setId] = useState("");
    const token = Cookies.get("token");
    const router = useRouter();
    const [titleChange, setTitleChange] = useState();
    const [descriptionChange, setDescriptionChange] = useState();



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

      async function deleteDish() {
        if (window.confirm("Souhaitez vous supprimer ce plat?")) {
          await axios.delete(`/api/dish/${dish?.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          router.push("/dishes/");
        }
      }

      const handleTitle = (e) => {
          setTitleChange(e.target.value);
      };

      
      const handleDescription = (e) => {
          setDescriptionChange(e.target.value);
      };



    return(
        <>
          <h2>Titre : </h2>{dish?.title} <br />
          <h2>Description : </h2>{dish?.description}
          <br />
          <br />
          <br />
          <br />
          <br />

          <form >
            <label>Title</label> <br />
            <input
              name="shackTitle"
              type="text"
              defaultValue={dish.title}
              onChange={handleTitle}
            /> <br />
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
          <br />

          <button onClick={deleteDish} >
            Supprimer
          </button>
          <br />
          <br />
          <br />

          <div>
            <h2>Recette :</h2>
            {dish.recipes.map(recipe => (
              <p>{recipe.name}</p>
            ))}
          </div>
        </>
    );
};


export async function getServerSideProps(context) {
    const { id } = context.params;
    const dish = await prisma.dish.findUnique({
        where: { id: parseInt(id) },
        include: { recipes: true }
    });
    return {
        props: {
            dish,
        },
    };
}

export default SelectedDish;