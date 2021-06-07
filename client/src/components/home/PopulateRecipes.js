import React from 'react';
import { Link } from 'react-router-dom';

const PopulateRecipes = (props) => {
    return (
        <div className="grid-container">
            { props.recipes && props.recipes.map((recipe, index) => (
                <ol key={ recipe._id } className="grid-item">
                    <Link className="link" to={ `/recipe?id=${recipe._id}` }><h3>{ recipe.title }</h3></Link>
                    <li>{ recipe.pictures[0] &&
                        <Link to={ `/recipe?id=${recipe._id}` }>
                        <img
                            className="grid-pic"
                            src={ `data:image/jpeg;base64,${recipe.pictures[0].picture.data}` } 
                        /></Link>
                    }</li>
                    <li>Cook time: { recipe.cookTime }</li>
                    <li>Created: { recipe.createdAt }</li>
                    { props.users[index] === 'Account Not Found' ?
                        <li>By: { props.users[index] }</li>
                        :
                        <li>By: <Link className="cursor" to={`/user?id=${recipe.owner}`}>{ props.users[index] }</Link></li>
                    }
                </ol>
            ))}
        </div>
    );
}

export { PopulateRecipes as default }