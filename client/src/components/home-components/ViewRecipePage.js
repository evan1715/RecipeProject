import React from 'react';
// import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const ViewRecipePage = () => {
    // const history = useHistory();
    const userRecipe = useSelector(state => state.userRecipesReducer);

    return (
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
    )
}


export { ViewRecipePage as default }