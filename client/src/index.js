import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import AppRouter from './router/AppRouter.js';
import storeConfig from './store/storeConfig.js';
import './scss/styles.scss'; //all styles
import { loginAction } from './actions/account.js';


const store = storeConfig();

const renderApp = () => {
    ReactDOM.render(
        <Provider store={ store }>
            <LoadingBar />
            <AppRouter />
        </Provider>,
        document.getElementById('root')
    );
}

const getUser = async () => {
    const token = localStorage.getItem('token');

    //If there's a token, retrieve user data before rendering the app.
    if (token) {
        const user = await (await fetch('/user/profile', { headers: { 'Authorization': token }})).json();
        store.dispatch(loginAction(user, token));

        renderApp();
    } else { //If there is no token, render the app.
        renderApp();
    }
}

getUser();