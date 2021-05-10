import processData from '../utils/processData.js';

//This file deals with user created recipes.

//Submit a recipe
const submitRecipeAction = (data) => ({
    type: 'SUBMIT_RECIPE',
    recipe: data
});

//ALL_RECIPES
const allRecipesAction = (data) => {
    const recipes = processData(data);

    return {
        type: 'ALL_RECIPES',
        recipes
    }
};

//MY_RECIPES
const myRecipesAction = (data) => {
    const recipes = processData(data);

    return {
        type: 'MY_RECIPES',
        recipes
    }
}

//GET_RECIPE
const getRecipeAction = (recipe) => {
    const data = processData(recipe);

    return {
        type: 'GET_RECIPE',
        recipe: data
    }
}

//DELETE_RECIPE
const deleteRecipeAction = () => ({
    type: 'DELETE_RECIPE'
});

const clearUserRecipesAction = () => ({
    type: 'CLEAR_USER_RECIPES'
});


export {
    submitRecipeAction,
    allRecipesAction,
    myRecipesAction,
    getRecipeAction,
    deleteRecipeAction,
    clearUserRecipesAction
}