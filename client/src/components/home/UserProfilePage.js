import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
// import userServerAPI from '../../database/userServerAPI.js';
// import recipeServerAPI from '../../database/recipeServerAPI.js';
// import processIndividualImage from '../../utils/processIndividualImage';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [username, setUsername] = useState();
    const [icon, setIcon] = useState();
    const [userRecipes, setUserRecipes] = useState();

    useEffect(async () => {
        dispatch(showLoading());

        const user_id = location.search.split('?id=')[1];
        const user = await (await fetch(`/user/username/${user_id}`)).json();
        const recipes = await (await fetch(`/recipes/user/${user}`)).json();
        const blob = await (await fetch(`/user/${user_id}/icon`)).blob();
        const url = URL.createObjectURL(blob);

        setIcon(url);
        setUsername(user);
        setUserRecipes(recipes);

        dispatch(hideLoading());
    }, []);

    return (
        <>{ username && 
            <><h1 className="center title">{ username }'s Profile</h1>
            <div className="user-profile-page">
                
                <div className="user-profile-page__left">
                    <h2 className="title">User's Information</h2>
                    <p>Username: { username }</p>
                </div>

                <div className="user-profile-page__center">
                    <h2 className="title">{ username }'s Recipes</h2>
                    { userRecipes && userRecipes.length < 1 && <p>This user hasn't submitted any recipes yet!</p>}
                    { userRecipes && userRecipes.length > 0 && userRecipes.map((recipe) => (
                        <Link className="cursor" key={ recipe._id } to={ `/recipe?id=${recipe._id}` }>{ recipe.title }</Link>
                    ))}
                </div>

                <div className="user-profile-page__right">
                    <img height="250" width="250" src={ icon } />
                </div>
            </div></>
        }</>
    )
}

export { UserProfilePage as default }