import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../../../recipeCard';
import DeleteRecipe from '../DeleteRecipes/DeleteRecipes';
import classes from './getRecipes.module.css';

const AllRecipes = () => {

    const [data, setData]= useState();
    const [loaded, setLoaded] = useState(false);

    const getRecipes = async() => {
        const result = await axios.get('/api/recipe/admin/getRecipes');
        setData(result.data)
        console.log(result.data)
        setLoaded(true)
    }

    useEffect(() => {
        getRecipes()
    }, []);

    const handleRecipeUpdate = () => {
        getRecipes();
    };

    return (
        <div>
            <h1>Recipes</h1>
            {loaded && data.map((recipe, i) => (
                <div key={i} className={classes.card}>
                    {recipe.id}
                    <DeleteRecipe id={recipe.id} onDelete={handleRecipeUpdate}/>
                </div>
            ))}
        </div>
    );
};

export default AllRecipes;