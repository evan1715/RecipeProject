import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from 'axios'

export const RECEIVE_RANDOM_RECIPES = 'RECEIVE_RANDOM_RECIPES'

function receiveRandomRecipes(recipes) {
    return {
        type: RECEIVE_RANDOM_RECIPES,
        recipes
    }
}

export function handleRandomRecipes(url, number) {
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
                dispatch(receiveRandomRecipes(res.data.recipes))
                dispatch(hideLoading())
            })
            .catch(err => {
                dispatch(hideLoading())
                console.log(err.message)
            })
    }
} 
