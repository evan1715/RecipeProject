import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import IosMenu from 'react-ionicons/lib/IosMenu'

export default function Nav() {
    const [showMenu, setShowMenu] = React.useState(false)
    const navLinks = ['All Recipes', 'Wine Pairing', 'Blog Posts', 'Cooking Videos', 'About', 'Sign In']
    const iconStyles = {
        cursor: 'pointer'
    }

    return (
        <div className='center'>
            <div className='nav-container'>
                <nav>
                    <Link to='/'>
                        <img src='https://simg.nicepng.com/png/small/206-2060627_willie-flaherty-small-taco-bell-logo.png' alt='dished online logo' />
                    </Link>

                    {/* Give the last item in the array an id of 'sign-up' */}
                    <div className='nav-links'>
                        {navLinks.map((navLink, index) => {
                            if(navLinks.length === index + 1) {
                                return (
                                    <Link id='sign-up' key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                        <li>
                                            {navLink}
                                        </li>   
                                    </Link>
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
                    <div onClick={() => setShowMenu(showMenu === true ? false : true)} className='burger-container'><IosMenu style={iconStyles} fontSize='35px' /></div>

                    {showMenu && 
                        <div className='popout-nav'>
                            {navLinks.map((navLink, index) => (
                                <Link key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                    <li>
                                        {navLink}
                                    </li>   
                            </Link>
                            ))}
                        </div>
                    }
                    
                </nav>

                <SearchBar />
            </div>
        </div>
    )
}
