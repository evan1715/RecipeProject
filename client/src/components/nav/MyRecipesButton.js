import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyRecipesButton = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);

    return (
        <button className="my-account__button" disabled={ !isAuth }>
        { isAuth ? 
            <Link className="my-recipes__button--link" to="/myrecipes">My Recipes</Link>
        :
            <div className="my-recipes__button--link">My Recipes</div>
        }
        </button>
    )
}

export { MyRecipesButton as default }