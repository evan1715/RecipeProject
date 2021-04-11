import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ component: Component, ...rest }) => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);

    return (
        <Route { ...rest } component={ (props) => (
            isAuth ? (
                <Component { ...props } />
            ) : (
                <Redirect to='/' />
            )
        )} />
    )
}

export { UserRoute as default }