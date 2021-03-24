import React from 'react';
import IoSearchOutline from 'react-ionicons/lib/IosSearchOutline';
import MyAccountMenu from './MyAccountMenu.js';

const SearchBar = () => {
    // ref will store the value of the input field so that this component can be without state.
    const input = React.useRef('')

    return (
        <div className='search-and-account-container'>
            <div className='searchbar'>
                <input 
                    ref={input}
                    placeholder='Search All Recipes' 
                />

                <button>
                    <IoSearchOutline />
                </button>
            </div>
            <MyAccountMenu />
        </div>
    )
}

export { SearchBar as default }