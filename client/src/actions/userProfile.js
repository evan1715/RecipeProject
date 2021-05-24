import processData from '../utils/processData.js';

const profileRecipesAction = (data) => {
    const recipes = processData(data);

    return {
        type: 'PROFILE_RECIPES',
        recipes: recipes
    }
}

const profileUserAction = (user) => ({
        type: 'PROFILE_USER',
        user: user
});

const clearProfileAction = () => ({
    type: 'CLEAR_PROFILE'
});

export {
    profileRecipesAction,
    profileUserAction,
    clearProfileAction
}