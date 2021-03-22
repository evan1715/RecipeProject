import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import AppRouter from './router/AppRouter.js';
import storeConfig from './store/storeConfig.js';
import './scss/styles.scss'; //all styles
import useServerAPI from './hooks/useServerAPI.js';


const store = storeConfig();
const token = localStorage.getItem('token');

//if there is a token stored, check if it's valid from the server.
if (token) {
    store.dispatch(useServerAPI('getUser', token));
}

ReactDOM.render(
    <Provider store={store}>
        <LoadingBar />
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);