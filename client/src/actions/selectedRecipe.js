import processData from '../utils/processData.js';

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

const editRecipeAction = (recipe) => ({
    type: 'EDIT_RECIPE',
    recipe
});

const clearSelectedRecipeAction = () => ({
    type: 'CLEAR_SELECTED_RECIPE'
});

export {
    viewRecipeAction,
    editRecipeAction,
    clearSelectedRecipeAction
}