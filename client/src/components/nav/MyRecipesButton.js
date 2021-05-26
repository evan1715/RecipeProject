import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyRecipesButton = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);

    return (
        <>
            <Link className="nav-bottom__link" to="/myrecipes">My Recipes</Link>
            <button className="nav-bottom__btn" disabled={ !isAuth }>
            { isAuth ? 
                <Link className="nav-bottom__btn--link" to="/myrecipes">My Recipes</Link>
                :
                <div className="nav-bottom__btn--link">My Recipes</div>
            }
            </button>
        </>
    )
}

export { MyRecipesButton as default }