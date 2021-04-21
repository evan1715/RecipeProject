import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from 'axios'

const handleRecipeRoulette = (url, number) => async dispatch => {
    dispatch(showLoading());

    try {
        const response = await axios.request({
            method: 'GET',
            url: url.concat('?apiKey=REDACTED'),
            params: { number: number}
        });
        const recipes = await response.data.recipes;
        
        dispatch(hideLoading());
        return dispatch({
            type: 'RECEIVE_RECIPE_ROULETTE',
            recipes
        })
    } catch (error) {
        console.log(error);
        dispatch(hideLoading());
    }
}

export { handleRecipeRoulette as default }