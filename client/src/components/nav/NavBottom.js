import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar.js';

const NavBottom = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);

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
                    {/* This svg/path part was sourced from the compiled version of displaying IosMenu from react-ionicons@3.1.4.
                        Visit npmjs.com/package/react-ionicons for the full package.
                        Getting rid of the module saves 54kb on bundle size and the package has major vulnerabilities, so I'm using this instead. */}
                    { isAuth ? 
                        <Link className="nav-bottom__btn--link" to="/myaccount">
                            My Account <svg className="nav-bottom__btn--icon" fill={ isAuth ? 'green' : 'red' } height="25px" rotate="0" style={{ verticalAlign: 'middle' }} viewBox="0 0 1024 1024" width="25px">
                                <path d="M128 288h768v64h-768v-64z M128 480h768v64h-768v-64z M128 672h768v64h-768v-64z" />
                            </svg>
                        </Link>
                        :
                        <div className="nav-bottom__btn--link">
                            My Account <svg className="nav-bottom__btn--icon" fill={ isAuth ? 'green' : 'red' } height="25px" rotate="0" style={{ verticalAlign: 'middle' }} viewBox="0 0 1024 1024" width="25px">
                                <path d="M128 288h768v64h-768v-64z M128 480h768v64h-768v-64z M128 672h768v64h-768v-64z" />
                            </svg>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}

export { NavBottom as default }