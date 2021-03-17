import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import storeConfig from './store/storeConfig.js';
import './scss/styles.scss'; //all styles
import Nav from './components/nav-components/Nav'
import HomePage from './components/home-components/HomePage'
import AboutPage from './components/home-components/AboutPage';
import LoadingBar from 'react-redux-loading-bar'

function App() {
    return (
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
        )
    }

const store = storeConfig();

ReactDOM.render(
<Provider store={store}>
    <LoadingBar />
    <App />
</Provider>,
document.getElementById('root')
);