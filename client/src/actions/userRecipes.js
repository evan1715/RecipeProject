import processData from '../utils/processData.js';

//This file deals with user created recipes.

//Submit a recipe
const submitRecipeAction = (data) => ({
    type: 'SUBMIT_RECIPE',
    recipe: data
});

//MY_RECIPES
const myRecipesAction = (data) => {
    const recipes = processData(data);

    return {
        type: 'MY_RECIPES',
        recipes
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
    myRecipesAction,
    deleteRecipeAction,
    clearUserRecipesAction
}