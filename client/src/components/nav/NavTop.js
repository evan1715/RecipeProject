import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateAccountModal from './CreateAccountModal.js';
import SignInModal from './SignInModal.js';
import { clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';
import { clearUserRecipesAction } from '../../actions/userRecipes.js';
import userServerAPI from '../../database/userServerAPI.js';
import logo from '../../logo.png';

const NavTop = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [openCreateAccountModal, setOpenCreateAccountModal] = useState('');
    const [openSigninModal, setOpenSigninModal] = useState(false);

    const logout = () => {
        dispatch(userServerAPI('logout', token)); //logout from local and server
        dispatch(clearSelectedRecipeAction());
        dispatch(clearUserRecipesAction());
        history.push('/'); //redirect them to the homepage once logged out
    }

    return (
        <div className="nav-top">
            <Link className="nav-logo" to="/"><img alt="dished online logo" src={ logo } /></Link>

            <nav className="nav-top__links">
                <Link className="nav-top__links--link" to="/">Home</Link>
                <Link className="nav-top__links--link" to="/allrecipes">All Recipes</Link>
                <Link className="nav-top__links--link" to="/conversions">Conversions</Link>
                <Link className="nav-top__links--link" to="/about">About</Link>
                { !isAuth && <>
                    <button className="nav-top__links--link" id="sign-up" onClick={ () => setOpenCreateAccountModal('true') }>
                        Create Account
                    </button>
                    <CreateAccountModal 
                        openCreateAccountModal={ openCreateAccountModal }
                        handleCloseModal={ () => setOpenCreateAccountModal('') }
                    />
                </> }
                <button className="nav-top__links--link" id="sign-up" onClick={ isAuth ? logout : () => setOpenSigninModal(true) }>
                    <p>{ isAuth ? 'Log Out' : 'Sign In' }</p>
                </button>
                <SignInModal openSigninModal={ openSigninModal } handleCloseModal={ () => setOpenSigninModal(false) } />
            </nav>

        </div>
    )
}

export { NavTop as default }