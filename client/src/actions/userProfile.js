import processData from '../utils/processData.js';

//PROFILE_RECIPES
const profileRecipesAction = (data) => {
    const recipes = processData(data);

    return {
        type: 'PROFILE_RECIPES',
        recipes: recipes
    }
}

//PROFILE_USER
const profileUserAction = (user) => ({
        type: 'PROFILE_USER',
        user: user
});

//CLEAR_PROFILE
const clearProfileAction = () => ({
    type: 'CLEAR_PROFILE'
});

export {
    profileRecipesAction,
    profileUserAction,
    clearProfileAction
}