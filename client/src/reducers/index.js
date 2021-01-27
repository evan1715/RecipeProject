import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import recipeRoulette from './recipe-roulette'

export default combineReducers({
    loadingBar: loadingBarReducer,
    recipeRoulette
})