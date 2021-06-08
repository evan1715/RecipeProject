import processData from '../utils/processData.js';

//SELECTED_RECIPE
const viewRecipeAction = (data) => {
    let recipe = data;
    
    if (data.pictures) {
        recipe = processData(data);
    }

    return {
        type: 'SELECTED_RECIPE',
        recipe
    }
}

//EDIT_RECIPE
const editRecipeAction = (recipe) => ({
    type: 'EDIT_RECIPE',
    recipe
});

//CLEAR_SELECTED_RECIPE
const clearSelectedRecipeAction = () => ({
    type: 'CLEAR_SELECTED_RECIPE'
});

export {
    viewRecipeAction,
    editRecipeAction,
    clearSelectedRecipeAction
}