import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

// export default function Nav() {
//     const navLinks = ['All Recipes', 'Wine Pairing', 'Blog Posts', 'Cooking Videos', 'About', 'Sign In']

//     return (
//         <div className='placeholder'>
//             <div className='nav-container'>
//                 <nav>
//                     <Link to='/'>
//                         <img src='https://simg.nicepng.com/png/small/206-2060627_willie-flaherty-small-taco-bell-logo.png' alt='dished online logo' />
//                     </Link>

//                     <div className='nav-links'>
//                         {navLinks.map((navLink, index) => (
//                             <li id='nav-link' key={index}>
//                                 {/* Remove the whitespace from our nav link and change it to lowercase so that the same array index can be used for our url path. */}
//                                 <Link to={`${navLink.toLowerCase().replace(' ', '')}`}>{navLink}</Link>
//                             </li>
//                         ))}
//                     </div>
//                 </nav>

//                 <SearchBar />
//             </div>
//         </div>
//     )
// }

export default function Nav() {
    const navLinks = ['All Recipes', 'Wine Pairing', 'Blog Posts', 'Cooking Videos', 'About', 'Sign In']

    return (
        <div className='placeholder'>
            <div className='nav-container'>
                <nav>
                    <Link to='/'>
                        <img src='https://simg.nicepng.com/png/small/206-2060627_willie-flaherty-small-taco-bell-logo.png' alt='dished online logo' />
                    </Link>

                    <div className='nav-links'>
                        {navLinks.map((navLink, index) => {
                            if(navLinks.length === index + 1) {
                                return (
                                    <Link id='sign-up' key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                        <li id='nav-link'>
                                            {navLink}
                                        </li>   
                                    </Link>
                                )} else {
                                    return (
                                        <Link key={index} to={`${navLink.toLowerCase().replace(' ', '')}`}>
                                            <li id='nav-link'>
                                                {navLink}
                                            </li>   
                                        </Link>
                                    )
                                }
                            }
                        )}
                    </div>
                </nav>

                <SearchBar />
            </div>
        </div>
    )
}
