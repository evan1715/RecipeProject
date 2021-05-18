import { showLoading, hideLoading } from 'react-redux-loading-bar';

const handleRecipeRoulette = (url, number) => async dispatch => {
    dispatch(showLoading());

    try {
        const response = await (await fetch(url.concat(`?apiKey=REDACTED&number=${number}`))).json();
        const recipes = response.recipes;

        dispatch({ type: 'RECEIVE_RECIPE_ROULETTE', recipes });
        dispatch(hideLoading());
    } catch (error) {
        console.log(error);
        dispatch(hideLoading());
    }
}

export { handleRecipeRoulette as default }