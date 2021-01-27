import { RECEIVE_RECIPE_ROULETTE } from '../actions/recipe-roulette'

export default function recipeRoulette(state = [], action) {
    switch(action.type) {
        case RECEIVE_RECIPE_ROULETTE :
            // Previous state isn't being spread across new state so that when the user spins recipe roulette, all of the
            // original recipes are dumped from memory and replaced with the new ones
            return [
                ...action.recipes
            ]
        default :
            return state
    }
}