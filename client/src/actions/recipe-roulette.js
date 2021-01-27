import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from 'axios'

export const RECEIVE_RECIPE_ROULETTE = 'RECEIVE_RECIPE_ROULETTE'

function receiveRecipeRoulette(recipes) {
    return {
        type: RECEIVE_RECIPE_ROULETTE,
        recipes
    }
}

export function handleRecipeRoulette(url, number) {
    const API = '3273002619e04c89b625192940c7dbb1'

    const options = {
        method: 'GET',
        url: url.concat(`?apiKey=${API}`),
        params: { number: number}
    }

    return dispatch => {
        showLoading()

        return axios.request(options)
            .then(res => {
                dispatch(receiveRecipeRoulette(res.data.recipes))
                dispatch(hideLoading())
            })
            .catch(err => {
                dispatch(hideLoading())
                console.log(err.message)
            })
    }
} 
