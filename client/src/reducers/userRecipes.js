const userRecipesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SUBMIT_RECIPE':
            return;
        case 'ALL_RECIPES':
            return;
        case 'MY_RECIPES':
            return;
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
        default:
            return state;
    }
}

export { userRecipesReducer as default }