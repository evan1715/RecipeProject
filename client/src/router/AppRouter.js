import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from '../components/nav-components/Nav.js';
import HomePage from '../components/home-components/HomePage.js';
import AllRecipesPage from '../components/home-components/AllRecipesPage.js';
import AboutPage from '../components/home-components/AboutPage.js';
import MyAccountPage from '../components/account-components/MyAccountPage.js';
import SubmitRecipePage from '../components/account-components/SubmitRecipePage.js';
import MyRecipesPage from '../components/account-components/MyRecipesPage.js';
import UserRoute from './UserRoute.js';

const AppRouter = () => (
    <Router>
        <Nav />
        <Switch>
            <Route exact path={'/'} component={HomePage} />

            <Route path={'/allrecipes'} component={ AllRecipesPage } />

            <Route path={'/winepairing'} component={HomePage} />

            <Route path={'/blogposts'} component={HomePage} />

            <Route path={'/cookingvideos'} component={HomePage} />

            <Route path={'/about'} component={AboutPage} />

            <UserRoute path='/myaccount' component={ MyAccountPage } />

            <UserRoute path='/submitrecipe' component={ SubmitRecipePage } />
            
            <UserRoute path='/myrecipes' component={ MyRecipesPage } />

            <Route render={() => <h1>404</h1>} />
        </Switch>
    </Router>
);

export { AppRouter as default }