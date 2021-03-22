import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from '../components/nav-components/Nav.js';
import HomePage from '../components/home-components/HomePage.js';
import AboutPage from '../components/home-components/AboutPage.js';

const AppRouter = () => (
    <Router>
        <Nav />
        <Switch>
            <Route exact path={'/'} component={HomePage} />

            <Route path={'/allrecipes'} component={HomePage} />

            <Route path={'/winepairing'} component={HomePage} />

            <Route path={'/blogposts'} component={HomePage} />

            <Route path={'/cookingvideos'} component={HomePage} />

            <Route path={'/about'} component={AboutPage} />

            <Route path={'/signin'} component={HomePage} />

            <Route render={() => <h1>404</h1>} />
        </Switch>
    </Router>
);

export { AppRouter as default }