import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const ViewRecipePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userRecipe = useSelector(state => state.userRecipesReducer);

    useEffect(() => {
        //http://localhost:3000/recipes/60761631e035f70fac014a0b
        // const recipe_id = location.pathname.split('recipe/')[1];
        // const recipe_id = location.pathname.split('?id=')[1];
        const recipe_id = location.search.split('?id=')[1];
        dispatch(recipeServerAPI('getRecipe', recipe_id));
    }, [])
    
    return (
        <div>
            { userRecipe.title && //Only render once we have the recipe.
            <div>
                <h1 className="title center">{ userRecipe.title }</h1>

                <p className="center">Submitted by: pending feature - owner_id: { userRecipe.owner }</p>
                <p className="center">Submitted: { userRecipe.createdAt }. Last updated: { userRecipe.updatedAt }</p>

                <div className="center">
                    { userRecipe.pictures.map((pic) => (
                        <img
                            key={ pic._id }
                            src={ `data:image/jpeg;base64,${pic.picture.data}` }
                        />
                    ))}
                </div>

                <p className="center">Cook time: { userRecipe.cookTime } minutes.</p>

                <ul>
                    <h3 className="title center">Ingredients:</h3>
                    { userRecipe.ingredients.map((ingredient) => (
                        <li className="center" key={ ingredient._id }>{ ingredient.amount } { ingredient.measurement } of { ingredient.item }</li>
                    ))}
                </ul>

                <h3 className="title center">Instructions:</h3>
                <blockquote className="center">{ userRecipe.instructions }</blockquote>
            </div>
            }
        </div>
    )
}


export { ViewRecipePage as default }