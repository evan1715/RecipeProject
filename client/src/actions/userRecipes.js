//Submit a recipe
const submitRecipeAction = (data) => ({
    type: 'SUBMIT_RECIPE',
    recipe: data
});

//ALL_RECIPES
const allRecipesAction = () => ({
    type: 'ALL_RECIPES'
});

//MY_RECIPES
const myRecipesAction = () => ({
    type: 'MY_RECIPES'
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


export {
    submitRecipeAction,
    allRecipesAction,
    myRecipesAction,
    getRecipeAction,
    updateRecipeAction,
    deleteRecipeAction,
    getRecipePicturesAction,
    deletePicturesAction
}