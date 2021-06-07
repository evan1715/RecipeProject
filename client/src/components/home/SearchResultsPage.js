import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { searchResultsAction } from '../../actions/allRecipes.js';
import PopulateRecipes from './PopulateRecipes.js';

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector(state => state.allRecipesReducer.searchResults);

    useEffect(async () => {
        dispatch(showLoading());
        const searchInput = location.search.split('?=')[1];
        const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}`;
        const key = '&apiKey=3273002619e04c89b625192940c7dbb1';
        const spoonSearch = await (await fetch(`${spoonURL}&addRecipeInformation=true&number=10${key}`)).json();
        dispatch(searchResultsAction(spoonSearch.results));
        dispatch(hideLoading());
    }, [location]);

    return (
        <>
            <h1 className="center title">Search Results</h1>
            { searchResults.length && <PopulateRecipes recipes={ searchResults } /> }
        </>
    )
}

export { SearchResultsPage as default }