//Submit a recipe
const submitRecipeAction = (data) => ({
    type: 'SUBMIT_RECIPE',
    recipe: data
});

//ALL_RECIPES
const allRecipesAction = (recipes) => ({
    type: 'ALL_RECIPES',
    recipes
});

//MY_RECIPES
const myRecipesAction = (recipes) => ({
    type: 'MY_RECIPES',
    recipes
});

//GET_RECIPE
const getRecipeAction = () => ({
    type: 'GET_RECIPE'
});

//UPDATE_RECIPE
const updateRecipeAction = () => ({
    type: 'UPDATE_RECIPE'
});

//DELETE_RECIPE
const deleteRecipeAction = () => ({
    type: 'DELETE_RECIPE'
});

//
const getRecipePicturesAction = () => ({
    type: 'GET_RECIPE_PICTURES'
});

const deletePicturesAction = () => ({
    type: 'DELETE_RECIPE_PICTURES'
});

const clearUserRecipesAction = () => ({
    type: 'CLEAR_USER_RECIPES'
});


export {
    submitRecipeAction,
    allRecipesAction,
    myRecipesAction,
    getRecipeAction,
    updateRecipeAction,
    deleteRecipeAction,
    getRecipePicturesAction,
    deletePicturesAction,
    clearUserRecipesAction
}