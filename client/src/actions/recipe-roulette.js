import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from 'axios'

const handleRecipeRoulette = (url, number) => async dispatch => {
    dispatch(showLoading());

    const response = await axios.request({
        method: 'GET',
        url: url.concat('?apiKey=3273002619e04c89b625192940c7dbb1'),
        params: { number: number}
    });
    
    const recipes = await response.data.recipes;

    dispatch(hideLoading());

    return dispatch({
        type: 'RECEIVE_RECIPE_ROULETTE',
        recipes
    })
}

export { handleRecipeRoulette as default }