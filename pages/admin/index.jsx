import React, { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import axios from 'axios';
import { Tabs } from '@mantine/core';
import AllDishes from '../../components/Admin/Dishes/getDishes/getDishes'
import { apiRecipes } from '../../components/utilities/operation';
import AllRecipes from '../../components/Admin/Recipes/GetRecipes/GetRecipes';


const AdminDashBoard = () => {

    const [dish, setDish]= useState();
    const [recipe, setRecipe] = useState();
    const [loadedRecipe, setLoadedRecipe] = useState(false);
    const [loadedDish, setLoadedDish] = useState(false);

    const getDishes = async() => {
        const result = await axios.get('/api/dish/getDishes');
        setDish(result.data)
        setLoadedDish(true)
    }

    useEffect(() => {
        getDishes()
    }, []);

    const getRecipes = async() => {
        const result = await axios.get('/api/recipe/admin/getRecipes');
        setRecipe(result.data)
        console.log(result.data)
        setLoadedRecipe(true)
    }

    useEffect(() => {
        getRecipes()
    }, []);



    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Tabs>
                <Tabs.Tab label={`Plats (${loadedDish && dish.length})`} ><AllDishes/></Tabs.Tab>
                <Tabs.Tab label={`Recettes (${loadedRecipe && recipe.length})`} ><AllRecipes/></Tabs.Tab>
            </Tabs>
        </div>
    );
};

export default AdminDashBoard;




