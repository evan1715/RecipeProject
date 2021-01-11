import React from 'react'
import IoSearchOutline from 'react-ionicons/lib/IosSearchOutline'

export default function SearchBar() {
    // ref will store the value of the input field so that this component can be without state.
    const input = React.useRef('')

    return (
        <div className='searchbar'>
            <input 
                ref={input}
                placeholder='Search All Recipes' 
            />

            <button>
                <IoSearchOutline />
            </button>
        </div>
    )
}
