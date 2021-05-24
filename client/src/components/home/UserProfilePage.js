import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { profileRecipesAction, profileUserAction } from '../../actions/userProfile';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userProfile = useSelector(state => state.userProfileReducer);
    const user = userProfile.user;
    const [username, setUsername] = useState();
    const [userRecipes, setUserRecipes] = useState();
    const user_id = location.search.split('?id=')[1]; //get the user's id off the url string
    const [recent, setRecent] = useState();

    const recentRecipes = () => {
        const length = userProfile.recipes.length;
        const recipes = [];

        for (let i = 1; i <= 3; i++) {
            recipes.push(userProfile.recipes[length-i]);
        }

        setRecent(recipes);
    }

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

    useEffect(() => {
        if (userProfile.recipes && userProfile.recipes.length) {
            recentRecipes();
        }
    }, [userProfile])

    return (
        <>{ username && 
            <>
            <h1 className="center title">{ username }'s Profile</h1>
            <div className="user-profile-page">
                
                <div className="user-profile-page__left">
                    <h2 className="title center">Most recent</h2>
                    { userProfile.recipes.length < 1 && <p>No recipes submitted yet!</p> }
                    { recent && recent.length > 0 && recent.map((recipe) => (
                        <li
                            className="cursor"
                            key={ recipe._id }
                            onClick={ () => history.push(`/recipe?id=${recipe._id}`) }
                        >{ recipe.title }</li>
                    ))}
                    <h2 className="title center">User's Information</h2>
                    <p>Username: { username }</p>
                    <p>Name: { user.name }</p>
                    <p>Location: ~pending~</p>
                    <p>Total Recipes: { userProfile.recipes.length }</p>
                </div>

                <div className="user-profile-page__center">
                    <h2 className="title">{ username }'s Recipes</h2>
                    <div className="user-profile-page__center--grid">
                        { userRecipes && userRecipes.length < 1 && <p>This user hasn't submitted any recipes yet!</p>}
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

                <div className="user-profile-page__right">
                    <img height="250" width="250" src={ `/user/${user_id}/icon` } />
                </div>
            </div></>
        }</>
    )
}

export { UserProfilePage as default }