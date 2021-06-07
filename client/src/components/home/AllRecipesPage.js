import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar';
import PopulateRecipes from './PopulateRecipes.js';
import processUsernames from '../../utils/processUsernames.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const AllRecipesPage = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.allRecipesReducer.allRecipes);
    const recipeOwners = useSelector(state => state.allRecipesReducer.recipeOwners);
    const [userNames, setUsernames] = useState([]);

    useEffect(async () => {
        //Only get it if we don't already have it.
        if (!allRecipes.length) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('allRecipes'));
        }
        //Get the usernames if we have recipes and if we don't already have their usernames stored.
        if (allRecipes.length && !recipeOwners.length) {
            dispatch(processUsernames(allRecipes));
        }
    }, [allRecipes]);

    useEffect(() => {
        setUsernames(recipeOwners);
    }, [recipeOwners]);

    return (
        <>
            <h1 className="center title">All User Recipes</h1>
            <PopulateRecipes
                recipes={ allRecipes.length && allRecipes }
                users={ userNames }
            />
        </>
    );
}

export { AllRecipesPage as default }