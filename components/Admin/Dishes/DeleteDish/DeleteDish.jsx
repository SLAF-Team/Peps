import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../../Button';
import Cookies from 'js-cookie'

const DeleteDish = ({id, onDelete}) => {

    const token = Cookies.get('token')

    const deleteDish = async () => {
        const result = await axios.delete(`/api/dish/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(result)
        onDelete()
    }

    return (
        <div>
            <Button
                label="Supprimer le plat"
                handleClick={() => deleteDish()}
                href="#"
                type="danger"
            />
        </div>
    );
};

export default DeleteDish;