import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import randomRecipes from './recipes'

export default combineReducers({
    loadingBar: loadingBarReducer,
    randomRecipes
})