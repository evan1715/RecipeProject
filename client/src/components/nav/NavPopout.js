import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar.js';
import SignInModal from './SignInModal.js';
import CreateAccountModal from './CreateAccountModal.js';
import { clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';
import { clearUserRecipesAction } from '../../actions/userRecipes.js';
import userServerAPI from '../../database/userServerAPI.js';
import logo from '../../logo.png';

const NavPopout = () => {
    const dispatch = useDispatch();
    const history = useHistory(); //hook that uses history npm package
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [openSigninModal, setOpenSigninModal] = useState(false);
    const [openCreateAccountModal, setOpenCreateAccountModal] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [toggle, setToggle] = useState(false);
    const user_id = user && user._id;

    const handleLogout = () => {
        dispatch(userServerAPI('logout', token)); //logout from local and server
        dispatch(clearSelectedRecipeAction());
        dispatch(clearUserRecipesAction());
        history.push('/'); //redirect them to the homepage once logged out
    }

    window.onclick = function() {
        if (showMenu && toggle) {
            setShowMenu(false);
        } else {
            setToggle(true);
        }
    }

    return (
        <div className="nav-popout">
            <Link className="nav-logo" to="/"><img alt="dished online logo" src={ logo } /></Link>
            <SearchBar />

            {/* This svg/path part was sourced from the compiled version of displaying IosMenu from react-ionicons@3.1.4.
                Visit npmjs.com/package/react-ionicons for the full package.
                Getting rid of the module saves 54kb on bundle size and the package has major vulnerabilities, so I'm using this instead. */}
            <svg className="nav-burger-btn" fill={ isAuth ? 'green' : 'red' } height="35px" onClick={ () => {
                setShowMenu(!showMenu);
                setToggle(false);
            }} rotate="0" viewBox="0 0 1024 1024" width="35px">
                <path d="M128 288h768v64h-768v-64z M128 480h768v64h-768v-64z M128 672h768v64h-768v-64z"></path>
            </svg>

            { showMenu &&
                <nav className="nav-popout__menu">
                    <div className="nav-popout__links">
                        <p>Pages</p>
                        <Link className="nav-popout__links--link" to="/">Home</Link>
                        <Link className="nav-popout__links--link" to="/allrecipes">All Recipes</Link>
                        <Link className="nav-popout__links--link" to="/conversions">Conversions</Link>
                        <Link className="nav-popout__links--link" to="/about">About</Link>
                    </div>
                    
                    <div className="nav-popout__middle" />
                    
                    <div className="nav-popout__links">
                        <p>Account</p>
                        { isAuth ? <>
                            <Link className="nav-popout__links--link" to="/myaccount">My Account</Link>
                            <Link className="nav-popout__links--link" to="/myrecipes">My Recipes</Link>
                            <Link
                                className="nav-popout__links--link"
                                onClick={ () => dispatch(clearSelectedRecipeAction())}
                                to="/submitrecipe"
                            >Submit Recipe</Link>
                            <Link className="nav-popout__links--link" to={ `/user?id=${user_id}` }>My Profile</Link>
                            <li className="nav-popout__links--link" onClick={ handleLogout }>Log Out</li>
                            
                            </>:<>

                            <li className="nav-popout__links--link" onClick={ () => setOpenSigninModal(true) }>Sign In</li>
                            <li className="nav-popout__links--link" onClick={ () => setOpenCreateAccountModal('true') }>Create Account</li>
                        </>}
                    </div>
                </nav>
            }

            <SignInModal openSigninModal={ openSigninModal } handleCloseModal={ () => setOpenSigninModal(false) } />
            <CreateAccountModal openCreateAccountModal={ openCreateAccountModal } handleCloseModal={ () => setOpenCreateAccountModal('') } />
        </div>
    )
}

export { NavPopout as default }