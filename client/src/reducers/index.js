import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import accountReducer from './account.js';
import recipeRoulette from './recipe-roulette'

export default combineReducers({
    loadingBar: loadingBarReducer,
    recipeRoulette,
    accountReducer
})