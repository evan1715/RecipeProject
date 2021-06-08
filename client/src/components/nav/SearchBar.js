import React, { useState } from 'react';
import IoSearchOutline from 'react-ionicons/lib/IosSearchOutline';
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
                <IoSearchOutline />
            </button>
        </div>
    )
}

export { SearchBar as default }