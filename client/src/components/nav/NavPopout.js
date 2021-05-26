import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';
import SearchBar from './SearchBar.js';
import SignInModal from './SignInModal.js';
import CreateAccountModal from './CreateAccountModal.js';
import { clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';
import { clearUserRecipesAction } from '../../actions/userRecipes.js';
import userServerAPI from '../../database/userServerAPI.js';

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
            <Link className="nav-logo" to="/"><img alt="dished online logo" src="" /></Link>
            <SearchBar />
            <IosMenu className="nav-burger-btn" color={ isAuth ? 'green' : 'red' } fontSize="35px" onClick={ () => {
                setShowMenu(!showMenu);
                setToggle(false);
            }} />

            { showMenu &&
                <nav className="nav-popout__menu">
                    <div className="nav-popout__links">
                        <p>Pages</p>
                        <Link className="nav-popout__links--link" to="/allrecipes">All Recipes</Link>
                        <Link className="nav-popout__links--link" to="/winepairing">Wine Pairing</Link>
                        <Link className="nav-popout__links--link" to="/blogposts">Blog Posts</Link>
                        <Link className="nav-popout__links--link" to="/cookingvideos">Cooking Videos</Link>
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