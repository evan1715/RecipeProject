import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeForm from './RecipeForm.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const EditRecipePage = () => {
    const dispatch = useDispatch();
    const userRecipeState = useSelector(state => state.userRecipesReducer);

    //Submit the recipe to the server
    const onSubmit = (recipe) => {
        const config = recipe;
        config.recipe_id = userRecipeState._id;

        dispatch(recipeServerAPI('updateRecipe', config));
    }

    return (
        <div>
            <h1 className="title center">Edit Recipe</h1>
            <RecipeForm
                onSubmit={ (recipe) => {
                    onSubmit(recipe)
                }}
            />
        </div>
    )
}

export { EditRecipePage as default }