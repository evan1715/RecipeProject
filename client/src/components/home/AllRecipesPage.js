import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoading } from 'react-redux-loading-bar';
import processUsernames from '../../utils/processUsernames.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const AllRecipesPage = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.allRecipesReducer.allRecipes);
    const recipeOwners = useSelector(state => state.allRecipesReducer.recipeOwners);
    const [userNames, setUsernames] = useState([]);

    useEffect(async () => {
        //Only get it if we don't already have it.
        if (!allRecipes.length) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('allRecipes'));
        }
        //Get the usernames if we have recipes and if we don't already have their usernames stored.
        if (allRecipes.length && !recipeOwners.length) {
            dispatch(processUsernames(allRecipes));
        }
    }, [allRecipes]);

    useEffect(() => {
        setUsernames(recipeOwners);
    }, [recipeOwners]);

    return (
        <div className="grid-container">
            { allRecipes.length > 0 && allRecipes.map((recipe, index) => (
                <ol key={ recipe._id } className="grid-item">
                    <Link className="link" to={ `/recipe?id=${recipe._id}` }><h3>{ recipe.title }</h3></Link>
                    <li>{ recipe.pictures[0] &&
                        <Link to={ `/recipe?id=${recipe._id}` }>
                        <img
                            className="grid-pic"
                            height="280"
                            width="400"
                            src={ `data:image/jpeg;base64,${recipe.pictures[0].picture.data}` } 
                        /></Link>
                    }</li>
                    <li>Cook time: { recipe.cookTime }</li>
                    <li>Created: { recipe.createdAt }</li>
                    { userNames[index] === 'Account Not Found' ?
                        <li>By: { userNames[index] }</li>
                        :
                        <li>By: <Link className="cursor" to={`/user?id=${recipe.owner}`}>{ userNames[index] }</Link></li>
                    }
                </ol>
            ))}
        </div>
    );
}

export { AllRecipesPage as default }