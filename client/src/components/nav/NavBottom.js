import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';
import SearchBar from './SearchBar.js';

const NavBottom = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    const iconColor = isAuth ? 'green' : 'red';
    const verticalAlign = { verticalAlign: 'middle' }

    return (
        <div className="nav-bottom">
            <SearchBar />

            <div className="nav-bottom__btn-container">
                <button className="nav-bottom__btn" disabled={ !isAuth }>
                    { isAuth ? 
                        <Link className="nav-bottom__btn--link" to="/myrecipes">My Recipes</Link>
                        :
                        <div className="nav-bottom__btn--link">My Recipes</div>
                    }
                </button>
                <button className="nav-bottom__btn" disabled={ !isAuth }>
                    { isAuth ? 
                        <Link className="nav-bottom__btn--link" to="/myaccount">
                            My Account <IosMenu
                                        className="nav-bottom__btn--icon"
                                        color={ iconColor }
                                        fontSize="25px"
                                        style={ verticalAlign }
                                        />
                        </Link>
                        :
                        <div className="nav-bottom__btn--link">
                            My Account <IosMenu
                                        className="nav-bottom__btn--icon"
                                        color={ iconColor }
                                        fontSize="25px"
                                        style={ verticalAlign }
                                            />
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}

export { NavBottom as default }