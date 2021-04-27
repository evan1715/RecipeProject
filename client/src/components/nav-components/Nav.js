import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu'
import userServerAPI from '../../database/userServerAPI.js';
import SignInModal from './SignInModal.js';
import SearchBar from './SearchBar'
import MyAccountMenu from './MyAccountMenu.js';


export default function Nav() {
    const dispatch = useDispatch();
    const history = useHistory(); //hook that uses history npm package
    const isAuthenticated = useSelector(state => state.accountReducer);
    const [showMenu, setShowMenu] = React.useState(false);
    const [toggle, setToggle] = useState(false);
    const [openSigninModal, setOpenSigninModal] = useState(false);
    const navLinks = ['All Recipes', 'Wine Pairing', 'Blog Posts', 'Cooking Videos', 'About', 'Sign In'];
    const iconStyles = { cursor: 'pointer' }
    const isAuth = isAuthenticated.authenticated;

    const logout = () => {
        const token = isAuthenticated.token;
        dispatch(userServerAPI('logout', token)); //logout from local and server
        history.push('/'); //redirect them to the homepage once logged out
        // setShowMenu(false);
    }
    
    window.onclick = function(/*event*/) {
        // if (!event.target.matches('burger-container')) {
            if (showMenu && toggle) {
                setShowMenu(false);
            } else {
                setToggle(true);
            }
        // }
    }

    return (
        <div className="center">
            <div className="nav-container">
                <nav>
                    <Link to='/'>
                        <img src="" alt="dished online logo" />
                    </Link>

                    {/* Give the last item in the array an id of 'sign-up' */}
                    <div className="nav-links">
                        {navLinks.map((navLink, index) => {
                            if(navLinks.length === index + 1) {
                                return (
                                    // <Link id='sign-up' key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                    //     <li>
                                    //         {navLink}
                                    //     </li>   
                                    // </Link>
                                    // <><button id='sign-up' key={ index }
                                    <div key={index}>
                                        <button id="sign-up" key={ index } onClick={ isAuth ? logout : () => setOpenSigninModal(true) }>
                                            <li>{ isAuth ? 'Log Out' : 'Sign In' }</li>
                                        </button>
                                        <SignInModal openSigninModal={ openSigninModal } handleCloseModal={ () => setOpenSigninModal(false) } />
                                    </div>
                                )} else {
                                    return (
                                        <Link key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                            <li>
                                                {navLink}
                                            </li>   
                                        </Link>
                                    )
                                }
                            }
                        )}
                    </div>



                    {/* Only show this burger when the screen is too small for the nav bar */}
                    {/* When the burger is clicked, then toggle the showMenu state property and show the nav menu popout */}
                    <div onClick={() => {
                        setShowMenu(showMenu === true ? false : true);
                        setToggle(false);
                    }} className="burger-container"><IosMenu style={iconStyles} fontSize="35px" /></div>
                    { showMenu && 
                        <div className="popout-nav">
                            { navLinks.map((navLink, index) => {
                                if (navLinks.length === index + 1) {
                                    return (
                                        <div key={ index }>
                                            <li 
                                                key={ index }
                                                // If we click logout or sign in, set show meu to false
                                                onClick={ isAuth ? 
                                                    () => (logout(), setShowMenu(false))
                                                    :
                                                    () => (setOpenSigninModal(true), setShowMenu(false)) 
                                                }
                                            >
                                                { isAuth ? 'Log Out' : 'Sign In' }
                                            </li>
                                            <SignInModal openSigninModal={ openSigninModal } handleCloseModal={ () => setOpenSigninModal(false) }/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <Link key={ index } to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                            {/* When we click a link, close the menu. Don't need this part because of 
                                            the double state toggle window.onclick, but keeping it just in case. */}
                                            {/* <li onClick={ () => setShowMenu(false) }>{ navLink }</li> */}
                                            <li>{ navLink }</li>
                                        </Link>
                                    )
                                }
                            })
                            }
                        </div>
                    }



                    {/* Only show this burger when the screen is too small for the nav bar */}
                    {/* When the burger is clicked, then toggle the showMenu state property and show the nav menu popout */}
                    {/* <div onClick={() => setShowMenu(showMenu === true ? false : true)} className="burger-container"><IosMenu style={iconStyles} fontSize="35px" /></div>

                    {showMenu && 
                        <div className="popout-nav">
                            {navLinks.map((navLink, index) => (
                                <Link key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                    <li>
                                        {navLink}
                                    </li>   
                            </Link>
                            ))}
                        </div>
                    } */}
                    
                </nav>

                <div className="second-row-nav-container">
                    <SearchBar />
                    <MyAccountMenu />
                </div>
            </div>
        </div>
    )
}
