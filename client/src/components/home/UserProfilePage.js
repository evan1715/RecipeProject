import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import LeftColumn from './../account/LeftColumn.js';
import RightColumn from './../account/RightColumn.js';
import { profileRecipesAction, profileUserAction } from '../../actions/userProfile';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userProfile = useSelector(state => state.userProfileReducer);
    const [username, setUsername] = useState();
    const [userRecipes, setUserRecipes] = useState();
    const user_id = location.search.split('?id=')[1]; //get the user's id off the url string

    useEffect(async () => {
        //If we already have the same thing stored, no need to retrieve it.
        if (userProfile.user._id !== user_id) {
            dispatch(showLoading());
            const user = await (await fetch(`/user/profile/${user_id}`)).json();
            const recipes = await (await fetch(`/recipes/user/${user.username}`)).json();
            dispatch(profileUserAction(user));
            dispatch(profileRecipesAction(recipes));
            setUsername(user.username);
            setUserRecipes(recipes);
            dispatch(hideLoading());
        } else {
            setUsername(userProfile.user.username);
            setUserRecipes(userProfile.recipes);
        }
    }, []);

    return (
        <>{ username && 
            <>
            <h1 className="columns-header">{ username }'s Profile</h1>
            <div className="columns">
                
                <LeftColumn isPublic={ true } />

                <div className="columns__center">
                    <h2 className="columns__title">{ username }'s Recipes</h2>
                    { userRecipes && userRecipes.length < 1 && <p>This user hasn't submitted any recipes yet!</p>}
                    <div className="user-profile-page__center--grid">
                        { userRecipes && userRecipes.length > 0 && userRecipes.map((recipe) => (
                            <div key={ recipe._id } className="user-profile-page__center--recipe">
                                { recipe.pictures[0] &&
                                    <Link to={ `/recipe?id=?${recipe._id}` }>
                                        <img
                                            className="user-profile-page__center--recipe-image"
                                            src={ `data:image/jpeg;base64,${recipe.pictures[0].picture.data}` }
                                        />
                                    </Link>
                                }
                                <div className="user-profile-page__center--recipe-content">
                                    <Link className="cursor" to={ `/recipe?id=${recipe._id}` }>
                                        <h3 className="user-profile-page__center--recipe-content--title">
                                            { recipe.title }
                                        </h3>
                                    </Link>
                                    <p>{ recipe.createdAt }</p>
                                    {/* { recipe.createdAt !== recipe.updatedAt && <p>Updated: { recipe.updatedAt }</p> } */}
                                    <p>{ recipe.cookTime } minutes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <RightColumn isPublic={ true } />
            </div></>
        }</>
    )
}

export { UserProfilePage as default }