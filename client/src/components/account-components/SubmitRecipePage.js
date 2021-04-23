import React from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RecipeForm from './RecipeForm.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const SubmitRecipe = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h1 className="title">Submit a recipe</h1>
            <RecipeForm
                onSubmit={ (config) => {
                    dispatch(recipeServerAPI('submitRecipe', config));
                }}
            />
        </div>
    )
}

export { SubmitRecipe as default }