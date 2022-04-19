import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import DishCard from '../../../components/DishCard/DishCard';
import Cookies from 'js-cookie';
import Router from 'next/router';
import DeleteDish from '../../../components/Admin/DeleteDish/DeleteDish';
import classes from './index.module.css'

const AllDishes = () => {

    const [data, setData]= useState();
    const [loaded, setLoaded] = useState(false);

    const getDishes = async() => {
        const result = await axios.get('/api/dish/getDishes');
        setData(result.data)
        setLoaded(true)
    }

    useEffect(() => {
        getDishes()
    }, []);

    const handleDishUpdate = () => {
        getDishes();
    };

    return (
        <div>
            <h1>Dishes</h1>
            {loaded && data.map((dish, i) => (
                <div key={i} className={classes.card}>
                    <DishCard dish={dish} key={i} col="col-3 col-6-sm" />
                    <DeleteDish id={dish.id} onDelete={handleDishUpdate}/>
                </div>
            ))}
        </div>
    );
};

export default AllDishes;