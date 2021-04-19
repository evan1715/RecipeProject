const userRecipesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SUBMIT_RECIPE':
            return {
                ...action.recipe
            };
        case 'ALL_RECIPES':
            return [
                ...action.recipes
            ]
        case 'MY_RECIPES':
            return [
                ...action.recipes
            ]
        case 'GET_RECIPE':
            return;
        case 'UPDATE_RECIPE':
            return;
        case 'DELETE_RECIPE':
            return {
                recipe: null
            };
        case 'GET_RECIPE_PICTURES':
            return {
                ...state,
                pictures: action.pictures
            };
        case 'DELETE_RECIPE_PICTURES':
            return {
                ...state,
                pictures: null
            };
        case 'CLEAR_USER_RECIPES':
            return {};
        default:
            return state;
    }
}

export { userRecipesReducer as default }