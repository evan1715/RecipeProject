import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeForm from './RecipeForm.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const EditRecipePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userRecipe = useSelector(state => state.userRecipesReducer);
    const [approvePush, setApprovePush] = useState(false);

    //Submit the recipe to the server
    const onSubmit = (recipe) => {
        const config = recipe;
        config.recipe_id = userRecipe._id;

        dispatch(recipeServerAPI('updateRecipe', config));
        setApprovePush(true);
    }

    useEffect(() => {
        if (approvePush) {
            history.push('/myrecipes');
        }
    }, [userRecipe]);

    return (
        <div>
            <h1 className="title center">Edit Recipe</h1>
            <RecipeForm onSubmit={ (recipe) => onSubmit(recipe) } />
        </div>
    )
}

export { EditRecipePage as default }