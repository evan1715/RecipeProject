import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoading } from 'react-redux-loading-bar';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const AllRecipesPage = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.allRecipesReducer.allRecipes);
    const [userNames, setUsernames] = useState([]);

    const getUsername = async () => {
        let list = [];
        let owners = [];

        for (let i = 0; i < allRecipes.length; i++) {
        /*  If we've already fetched a recipe's owner's username, let's not waste resources by checking our list
            we've already received from fetch. We'll filter an array of objects containing the user id and their
            username. Then we'll only call fetch if there isn't one. If there is, we'll just what we already
            have without calling fetch. */
            try {
                const owner_id = allRecipes[i].owner;
                const already = owners.find(id => id.owner_id === owner_id);

                if (!already) {
                    const user = await (await fetch(`/user/username/${owner_id}`)).json();
                    list.push(user);
                    owners.push({ owner_id, user });
                } else {
                    list.push(already.user);
                }
            } catch (error) {
                list.push('Account Not Found');
            }
        }
        setUsernames(list);
    }

    useEffect(() => {
        //Only get it if we don't already have it.
        if (!allRecipes.length) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('allRecipes'));
        }
    }, []);

    useEffect(async () => {
        getUsername();
    }, [allRecipes]);

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
                    <li>By: { userNames[index] }</li>
                </ol>
            ))}
        </div>
    );
}

export { AllRecipesPage as default }