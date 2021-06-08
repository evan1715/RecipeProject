import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { searchResultsAction } from '../../actions/allRecipes.js';
import PopulateRecipes from './PopulateRecipes.js';

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector(state => state.allRecipesReducer.searchResults);
    const [showReason, setShowReason] = useState(false);

    useEffect(async () => {
        dispatch(showLoading());
        const searchInput = location.search.split('?=')[1];
        const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}`;
        const key = '&apiKey=3273002619e04c89b625192940c7dbb1';
        //&addRecipeInformation=true for more recipe info (& larger download)
        const spoonSearch = await (await fetch(`${spoonURL}&number=20${key}`)).json();
        dispatch(searchResultsAction(spoonSearch.results));
        dispatch(hideLoading());
    }, [location]);

    return (
        <div className="search-results">
            <h1 className="center title">Search Results by Spoonacular</h1>
            <p className="center">The results do not contain user submitted recipes. View the All Recipes page to see user recipes.</p>
            <p className="search-results__learn-more">
                <p className="center link-blue" onClick={ () => setShowReason(!showReason) }>Why no user submitted results?</p>
                { showReason && <p className="center">
                    There's too few user submitted recipes. If there's a significant amount, then it will 
                    be implemented into the search. For now, being there's so little, the All Recipes page is 
                    easy enough to navigate with such little selection so a search for it is not necessary.
                </p>}
            </p>
            { searchResults.length && <PopulateRecipes recipes={ searchResults } /> }
        </div>
    )
}

export { SearchResultsPage as default }