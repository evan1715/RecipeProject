import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import AppRouter from './router/AppRouter.js';
import storeConfig from './store/storeConfig.js';
import './scss/styles.scss'; //all styles
import { loginAction, logoutAction } from './actions/account.js';


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
        try {
            const user = await (await fetch('/user/me', { headers: { 'Authorization': token }})).json();

            if (user.error) {
                //If the account can't be found, log them out locally.
                store.dispatch(logoutAction(token));
            } else {
                store.dispatch(loginAction(user, token));
            }
        } catch (error) {
            console.log(error);
        }

        renderApp();
    } else { //If there is no token, render the app.
        renderApp();
    }
}

getUser();