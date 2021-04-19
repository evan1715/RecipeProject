import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.accountReducer);
    const userRecipes = useSelector(state => state.userRecipesReducer);

    //let's include a remove option with an "are you sure?" modal

    //view my recipes
    //get a recipe by id
    //update a recipe
    //delete a recipe
    //upload pictures to recipe
    //delete pictures of recipe

    useEffect(() => {
        dispatch(recipeServerAPI('myRecipes', user.username));
    }, []);

    return (
        <div>
            <h1 className="title">My Recipes</h1>
            { userRecipes.length < 1 && <p>You haven't submitted any recipes yet!</p> }
            { userRecipes.length > 0 && userRecipes.map((recipe) => (
                <h3 key={ recipe._id }>{ recipe.title }</h3>
            ))}
        </div>
    )
}

export { MyRecipesPage as default }