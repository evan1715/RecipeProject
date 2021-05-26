import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';
import SearchBar from './SearchBar.js';
import MyAccountButton from './MyAccountButton.js';
import MyRecipesButton from './MyRecipesButton.js';
import { clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';
import { clearUserRecipesAction } from '../../actions/userRecipes.js';
import userServerAPI from '../../database/userServerAPI.js';

const NavBottom = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const user_id = user && user._id;

    const handleLogout = () => {
        dispatch(userServerAPI('logout', token)); //logout from local and server
        dispatch(clearSelectedRecipeAction());
        dispatch(clearUserRecipesAction());
        history.push('/'); //redirect them to the homepage once logged out
    }

    return (
        <div className="nav-bottom">

            {/* Display the search bar regardless. */}
            <SearchBar />

            {/* We'll only show this container if it's a larger screen. */}
            <div className="nav-bottom__btn-container">
                <MyRecipesButton />
                <MyAccountButton />
            </div>

            {/* We'll show this one if it's a smaller screen. */}
            <div className="nav-bottom__menu-container">
                <IosMenu
                    color={ isAuth ? 'green' : 'red' }
                    fontSize="35px"
                />
                { isAuth &&
                    <div className="dropdown-content">
                        <MyAccountButton />
                        <MyRecipesButton />
                        <Link
                            className="nav-bottom__link"
                            onClick={ () => dispatch(clearSelectedRecipeAction())}
                            to="/submitrecipe"
                        >Submit Recipe</Link>
                        <Link className="nav-bottom__link" to={ `/user?id=${user_id}` }>My Profile</Link>
                        <span className="nav-bottom__link" onClick={ handleLogout }>Log Out</span>
                    </div>
                }
            </div>
        </div>
    )
}

export { NavBottom as default }