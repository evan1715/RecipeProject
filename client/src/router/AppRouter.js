import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserRoute from './UserRoute.js'; //private routes
import Nav from '../components/nav/Nav.js'; //nav
import Footer from '../components/nav/Footer.js'; //footer
// Home components/non-authorized pages.
const HomePage = React.lazy(() => import('../components/home/HomePage.js'));
const AllRecipesPage = React.lazy(() => import('../components/home/AllRecipesPage.js'));
const AboutPage = React.lazy(() => import('../components/home/AboutPage.js'));
const ConversionsPage = React.lazy(() => import('../components/home/ConversionsPage.js'));
const SearchResultsPage = React.lazy(() => import('../components/home/SearchResultsPage.js'));
const UserProfilePage = React.lazy(() => import('../components/home/UserProfilePage.js'));
const ViewRecipePage = React.lazy(() => import('../components/home/ViewRecipePage.js'));
//Account components/authorized only pages.
const EditRecipePage = React.lazy(() => import('../components/account/EditRecipePage.js'));
const MyAccountPage = React.lazy(() => import('../components/account/MyAccountPage.js'));
const MyRecipesPage = React.lazy(() => import('../components/account/MyRecipesPage.js'));
const SubmitRecipePage = React.lazy(() => import('../components/account/SubmitRecipePage.js'));

const AppRouter = () => (
    <Router>
        <Nav />
        <React.Suspense fallback={ <p className="center">Loading...</p> }>
            <Switch>
                <Route exact path={'/'} component={HomePage} />

                <Route path={'/allrecipes'} component={ AllRecipesPage } />

                <Route path={'/conversions'} component={ ConversionsPage } />

                <Route path={'/about'} component={ AboutPage } />

                <Route path={'/recipe'} component={ ViewRecipePage } />

                <Route path={'/user'} component={ UserProfilePage } />

                <Route path={'/search'} component={ SearchResultsPage } />

                <UserRoute path='/editrecipe' component={ EditRecipePage } />

                <UserRoute path='/myaccount' component={ MyAccountPage } />
                
                <UserRoute path='/myrecipes' component={ MyRecipesPage } />

                <UserRoute path='/submitrecipe' component={ SubmitRecipePage } />

                <Route render={() => <h1 className="center">404: Page Not Found</h1>} />
            </Switch>
        </React.Suspense>
        <Footer />
    </Router>
);

export { AppRouter as default }