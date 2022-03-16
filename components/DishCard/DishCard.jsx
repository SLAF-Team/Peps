import React from 'react';

const DishCard = (props) => {

    const dish = props.dish;

    
    return (
        <div>
            <h1>Titre : {dish.title}</h1>
            <p>Description : {dish.description}</p>
            <button>Plus d'info</button>
        </div>
    );
};

export default DishCard;