const userRecipesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SUBMIT_RECIPE':
            return {
                ...action.recipe
            }
        case 'MY_RECIPES':
            return [
                ...action.recipes
            ];
        case 'GET_RECIPE':
            return {
                ...action.recipe
            }
        case 'DELETE_RECIPE':
            return {
                recipe: null
            }
        case 'CLEAR_USER_RECIPES':
            return {}
        default:
            return state;
    }
}

export { userRecipesReducer as default }