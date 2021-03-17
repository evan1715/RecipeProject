import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import accountReducer from '../reducers/account.js';
import recipeRoulette from '../reducers/recipe-roulette.js';

/*  Added the the Redux Devtool Extension for Firefox and Edge/Chrome to our browsers. 
    So, with that, we needed to add an enhancer argument to utilize the tool in the browser.
    http://extension.remotedev.io/ 
*/

export default () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combineReducers({
            loadingBar: loadingBarReducer,
            recipeRoulette,
            accountReducer
        }),
        composeEnhancers(applyMiddleware(logger, thunk))
    );
    return store;
}