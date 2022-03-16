import React from 'react';
import { useState } from 'react';

const DishCard = (props) => {
    const dish = props.dish;

    console.log(dish.recipes)


    // console.log(recipe)
    
    return (
        <div>
            <h1>Titre : {dish.title}</h1>
            <p>Description : {dish.description}</p>
            <p>Recipe : {dish.recipes.map(recipe => {
                {recipe.values()}
            })}</p>

        </div>
    );
};

export default DishCard;