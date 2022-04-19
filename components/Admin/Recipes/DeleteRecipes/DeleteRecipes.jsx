import React from 'react';
import axios from 'axios';
import Button from '../../../Button';
import Cookies from 'js-cookie'

const DeleteRecipe = ({id, onDelete}) => {

    const token = Cookies.get('token')

    const deleteRecipe = async () => {
        const result = await axios.delete(`/api/recipe/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(result)
        onDelete()
    }

    return (
        <div>
            <Button
                label="Supprimer la recette"
                handleClick={() => deleteRecipe()}
                href="#"
                type="danger"
            />
        </div>
    );
};

export default DeleteRecipe;