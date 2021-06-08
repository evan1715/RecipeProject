import React from 'react';
import { Link } from 'react-router-dom';

const PopulateRecipes = (props) => (
    <div className="grid-container">
        { props.recipes && (props.recipes).map((recipe, index) => (
            <ol key={ recipe._id ? recipe._id : recipe.id } className="grid-item">
                <Link className="link" to={ () => (
                    recipe._id ? `/recipe?id=${recipe._id}` : `/recipe?type=spoon?id=${recipe.id}`
                )}>
                    <h3>{ recipe.title }</h3>
                </Link>
                { recipe.pictures ?
                    <li>{ recipe.pictures[0] &&
                        <Link to={ `/recipe?id=${recipe._id}` }>
                        <img
                            className="grid-pic"
                            src={ `data:image/jpeg;base64,${recipe.pictures[0].picture.data}` } 
                        /></Link>
                    }</li>
                    :
                    <Link to={ `/recipe?type=spoon?id=${recipe.id}` }>
                        <img className="grid-pic" src={ recipe.image } />
                    </Link>
                }
                { recipe.cookTime && <li>Cook time: { recipe.cookTime }</li> }
                { recipe.createdAt && <li>Created: { recipe.createdAt }</li> }
                
                { props.users && <div>{ props.users[index] === 'Account Not Found' ?
                    <li>By: { props.users[index] }</li>
                    :
                    <li>By: <Link className="link-blue" to={`/user?id=${recipe.owner}`}>{ props.users[index] }</Link></li>
                }</div>}
            </ol>
        ))}
    </div>
);

export { PopulateRecipes as default }