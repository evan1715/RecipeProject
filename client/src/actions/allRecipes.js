import processData from '../utils/processData.js';

//This file deals with all recipes.

//ALL_RECIPES
const allRecipesAction = (data) => {
    const recipes = processData(data);
    
    return {
        type: 'ALL_RECIPES',
        recipes
    }
}

//RECIPE_OWNERS
const recipeOwnersAction = (usernames) => ({
    type: 'RECIPE_OWNERS',
    usernames
});

//SEARCH_RESULTS
const searchResultsAction = (data) => {
    const recipes = processData(data);

    return {
        type: 'SEARCH_RESULTS',
        recipes
    }
}

export {
    allRecipesAction,
    recipeOwnersAction,
    searchResultsAction
}