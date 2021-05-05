import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeForm from './RecipeForm.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const SubmitRecipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userRecipe = useSelector(state => state.userRecipesReducer);
    const [approvePush, setApprovePush] = useState(false);

    useEffect(() => {
        if (approvePush) {
            history.push('/myrecipes');
        }
    }, [userRecipe]);

    return (
        <div>
            <h1 className="title center">Submit a recipe</h1>
            <RecipeForm onSubmit={ (config) => {
                dispatch(recipeServerAPI('submitRecipe', config));
                setApprovePush(true);
            }} />
        </div>
    )
}

export { SubmitRecipe as default }