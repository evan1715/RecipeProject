const selectedRecipeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SELECTED_RECIPE':
            return {
                ...action.recipe
            }
        case 'EDIT_RECIPE':
            return {
                ...action.recipe
            }
        case 'CLEAR_SELECTED_RECIPE':
            return {}
        default:
            return state;
    }
}

export { selectedRecipeReducer as default }