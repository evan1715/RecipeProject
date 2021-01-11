import { RECEIVE_RANDOM_RECIPES } from '../actions/random-recipes'

export default function randomRecipes(state = [], action) {
    switch(action.type) {
        case RECEIVE_RANDOM_RECIPES :
            return [
                ...state,
                ...action.recipes
            ]
        default :
            return state
    }
}