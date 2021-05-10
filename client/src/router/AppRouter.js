import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserRoute from './UserRoute.js'; //private routes
import Nav from '../components/nav/Nav.js'; //nav
// Home components/non-authorized pages.
import HomePage from '../components/home-components/HomePage.js';
import AllRecipesPage from '../components/home-components/AllRecipesPage.js';
import AboutPage from '../components/home-components/AboutPage.js';
import PopulateRecipes from '../components/home-components/PopulateRecipes.js';
import ViewRecipePage from '../components/home-components/ViewRecipePage.js';
// const HomePage = React.lazy(() => import('../components/home-components/HomePage.js'));
// const AllRecipesPage = React.lazy(() => import('../components/home-components/AllRecipesPage.js'));
// const AboutPage = React.lazy(() => import('../components/home-components/AboutPage.js'));
// const ViewRecipePage = React.lazy(() => import('../components/home-components/ViewRecipePage.js'));
//Account components/authorized only pages.
import EditRecipePage from '../components/account-components/EditRecipePage.js';
import MyAccountPage from '../components/account-components/MyAccountPage.js';
import MyRecipesPage from '../components/account-components/MyRecipesPage.js';
import SubmitRecipePage from '../components/account-components/SubmitRecipePage.js';
// const EditRecipePage = React.lazy(() => import('../components/account-components/EditRecipePage.js'));
// const MyAccountPage = React.lazy(() => import('../components/account-components/MyAccountPage.js'));
// const MyRecipesPage = React.lazy(() => import('../components/account-components/MyRecipesPage.js'));
// const SubmitRecipePage = React.lazy(() => import('../components/account-components/SubmitRecipePage.js'));


const AppRouter = () => (
    <Router>
        <Nav />
        <React.Suspense fallback={<p className="center">Loading...</p>}>
            <Switch>
                <Route exact path={'/'} component={HomePage} />

                <Route path={'/allrecipes'} component={ AllRecipesPage } />

                <Route path={'/winepairing'} component={ PopulateRecipes } />

                <Route path={'/blogposts'} component={HomePage} />

                <Route path={'/cookingvideos'} component={HomePage} />

                <Route path={'/about'} component={ AboutPage } />

                <Route path={`/recipe`} component={ ViewRecipePage } />

                <UserRoute path='/editrecipe' component={ EditRecipePage } />

                <UserRoute path='/myaccount' component={ MyAccountPage } />
                
                <UserRoute path='/myrecipes' component={ MyRecipesPage } />

                <UserRoute path='/submitrecipe' component={ SubmitRecipePage } />

                <Route render={() => <h1 className="center">404: Page Not Found</h1>} />
            </Switch>
        </React.Suspense>
    </Router>
);

export { AppRouter as default }