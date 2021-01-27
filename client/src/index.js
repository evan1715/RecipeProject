import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import reducer from './reducers'
import './scss/index.scss';
import Nav from './components/nav-components/Nav'
import HomePage from './components/home-components/HomePage'
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

        <Route path={'/about'} component={HomePage} />

        <Route path={'/signin'} component={HomePage} />

        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
    )
}

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <LoadingBar />
    <App />
  </Provider>,
  document.getElementById('root')
);