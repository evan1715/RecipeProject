import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserRoute from './UserRoute.js'; //private routes
import Nav from '../components/nav-components/Nav.js'; //nav
//Home components/non-authorized pages.
import HomePage from '../components/home-components/HomePage.js';
import AllRecipesPage from '../components/home-components/AllRecipesPage.js';
import AboutPage from '../components/home-components/AboutPage.js';
import ViewRecipePage from '../components/home-components/ViewRecipePage.js';
//Account components/authorized only pages.
import EditRecipePage from '../components/account-components/EditRecipePage.js';
import MyAccountPage from '../components/account-components/MyAccountPage.js';
import MyRecipesPage from '../components/account-components/MyRecipesPage.js';
import SubmitRecipePage from '../components/account-components/SubmitRecipePage.js';

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

            <Route path={`/recipe}`} component={ ViewRecipePage } />

            <UserRoute path='/editrecipe' component={ EditRecipePage } />

            <UserRoute path='/myaccount' component={ MyAccountPage } />
            
            <UserRoute path='/myrecipes' component={ MyRecipesPage } />

            <UserRoute path='/submitrecipe' component={ SubmitRecipePage } />

            <Route render={() => <h1>404</h1>} />
        </Switch>
    </Router>
);

export { AppRouter as default }