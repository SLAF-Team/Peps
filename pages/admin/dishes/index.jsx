import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import DishCard from '../../../components/DishCard/DishCard';
import Cookies from 'js-cookie';
import Router from 'next/router';

const AllDishes = () => {

    const [data, setData]= useState();
    const [loaded, setLoaded] = useState(false);
    const token = Cookies.get('token')

    const getDishes = async() => {
        const result = await axios.get('/api/dish/getDishes');
        setData(result.data)
        setLoaded(true)
    }

    useEffect(() => {
        getDishes()
    }, [])


    const deleteDish = async(id) => {
        const result = await axios.delete(`/api/dish/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(result)
        Router.push('/admin')
    }

    return (
        <div>
            <h1>Dishes</h1>
            {loaded && data.map((dish, i) => (
                <div key={i}>
                    <DishCard dish={dish} key={i} col="col-3 col-6-sm" />
                    <Button
                    label="Supprimer le plat"
                    handleClick={() => deleteDish(dish.id)}
                    href="#"
                    type="danger"
                    />
                </div>
            ))}

        </div>
    );
};

export default AllDishes;