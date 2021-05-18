const defaultState = {
    allRecipes: {},
    recipeOwners: {}, 
    searchResults: {}
}

const allRecipesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ALL_RECIPES':
            return {
                ...state,
                allRecipes: action.recipes
            }
        case 'RECIPE_OWNERS':
            return {
                ...state,
                recipeOwners: action.usernames
            }
        case 'SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.recipes
            }
        default:
            return state;
    }
}

export { allRecipesReducer as default }