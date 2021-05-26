import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';
import SearchBar from './SearchBar.js';
import MyAccountButton from './MyAccountButton.js';
import MyRecipesButton from './MyRecipesButton.js';

const NavBottom = () => {
    const user_id = useSelector(state => state.accountReducer.user._id);
    const isAuth = useSelector(state => state.accountReducer.authenticated);

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
                        <Link className="nav-bottom__link" to="/submitrecipe">Submit Recipe</Link>
                        <Link className="nav-bottom__link" to={ `/user?id=${user_id}` }>My Profile</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export { NavBottom as default }