import { showLoading, hideLoading } from 'react-redux-loading-bar';

const handleRecipeRoulette = (url, number) => async dispatch => {
    dispatch(showLoading());

    try {
        const response = await (await fetch(url.concat(`?apiKey=3273002619e04c89b625192940c7dbb1&number=${number}`))).json();
        const recipes = response.recipes;

        dispatch(hideLoading());
        return dispatch({ type: 'RECEIVE_RECIPE_ROULETTE', recipes });
    } catch (error) {
        console.log(error);
        dispatch(hideLoading());
    }
}

export { handleRecipeRoulette as default }