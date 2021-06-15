import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
    const history = useHistory();
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = () => {
        setSearchInput('');
        history.push(`/search?=${searchInput}`);
    }

    return (
        <div className="searchbar">
            <input
                onChange={ (e) => setSearchInput(e.target.value) }
                onKeyPress={ (e) => (e.key === 'Enter') && handleSubmit() }
                placeholder="Search for Recipes" 
                type="text"
                value={ searchInput }
            />

            <button onClick={ handleSubmit } >
                {/* This svg/path part was sourced from the compiled version of displaying IoSearchOutline from react-ionicons@3.1.4.
                    Visit npmjs.com/package/react-ionicons for the full package.
                    Getting rid of the module saves 54kb on bundle size and the package has major vulnerabilities, so I'm using this instead. */}
                <svg fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024" rotate="0">
                    <path d="M896.6 849.4l-226.6-226.8c41.6-52 66.6-118.2 66.6-190.2 0-168.2-136.2-304.4-304-304.4-168 0-304 
                    136.4-304 304.4s136.2 304.4 304 304.4c72.4 0 138.8-25.4 191-67.6l226.4 226.8 46.6-46.6zM240.2 
                    625.2c-51.4-51.4-79.6-119.8-79.6-192.6s28.4-141.2 79.6-192.6 119.8-80 192.4-80c72.6 0 141 28.4 192.4 
                    79.8s79.6 119.8 79.6 192.6-28.4 141.2-79.6 192.6c-51.4 51.4-119.8 79.8-192.4 79.8-72.6 0.2-141-28.2-192.4-79.6z" />
                </svg>
            </button>
        </div>
    )
}

export { SearchBar as default }