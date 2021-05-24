const defaultState = {
    recipes: {},
    user: {}
}

const userProfileReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'PROFILE_RECIPES':
            return {
                ...state,
                recipes: action.recipes
            }
        case 'PROFILE_USER':
            return {
                ...state,
                user: action.user
            }
        case 'CLEAR_PROFILE':
            return {}
        default:
            return state;
    }
}

export { userProfileReducer as default }