import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { showLoading } from 'react-redux-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const MyLeftColumn = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.accountReducer);
    const userRecipes = useSelector(state => state.userRecipesReducer);
    const userProfile = useSelector(state => state.userProfileReducer);
    const [recent, setRecent] = useState([]);

    const recentRecipes = () => {
        //Select which reducer on if we're viewing our own or a public profile.
        const length = !props.isPublic ? userRecipes.length : userProfile.recipes.length;
        const list = !props.isPublic ? userRecipes : userProfile.recipes;
        const recipes = [];

        for (let i = 1; i <= 3; i++) {
            recipes.push(list[length-i]);
        }

        setRecent(recipes);
    }

    useEffect(() => {
        //Only get this if we don't already have it and if it's the current user's.
        if (!props.isPublic) {
            if (!userRecipes.length || userRecipes.recipe === null) {
                dispatch(showLoading());
                dispatch(recipeServerAPI('myRecipes', user.username));
            }
        }
    }, []);

    useEffect(() => {
        //Run this if either change and on load.
        recentRecipes();
    }, [userRecipes, userProfile]);

    return (
        <div className="columns__left">
            <h2 className="columns__title">Most recent</h2>

            { !props.isPublic ?
                userRecipes.length < 1 && <p>No recipes submitted yet!</p>
                :
                userProfile.recipes.length < 1 && <p>No recipes submitted yet!</p>
            }

            { recent && recent[0] !== undefined && recent.map((recipe) => {
                if (recipe) {
                    return (
                        <p key={ recipe._id }>
                            <Link className="link-blue" to={ `/recipe?id=${recipe._id}` }>
                                { recipe.title }
                            </Link>
                        </p>
                    )
                }
            })}

            <h2 className="columns__title">User Information</h2>
            <p>Username: { !props.isPublic ? user.username : userProfile.user.username }</p>
            <p>Name: { !props.isPublic ? user.name : userProfile.user.name }</p>
            { !props.isPublic && <p>Email: { user.email }</p> }
            <p>Total Recipes: { !props.isPublic ?
                userRecipes && userRecipes.length > 0  && userRecipes.length
                :
                userProfile.recipes && userProfile.recipes.length > 0 && userProfile.recipes.length
            }
            </p>
        </div>
    )
}

export { MyLeftColumn as default }