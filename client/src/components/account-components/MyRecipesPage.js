import React, { useState } from 'react';

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    
    //How do we retrieve recipe ids, recipe titles and list them for a user?
        //^^could create local recipes in state to test it out first before retrieving the database
    //is recipe.id and recipe.title correct? is setRecipes correct?
    //should we use <li> to list out them all?
    //let's include a remove option with an "are you sure?" modal

    //view my recipes
    //get a recipe by id
    //update a recipe
    //delete a recipe
    //upload pictures to recipe
    //delete pictures of recipe

    return (
        <div>
            <h1 className="title"></h1>
            { recipes.map((recipe) => (
                <div key={ recipe.id }>
                    <h3>{ recipe.title }</h3>
                </div>
            ))}
        </div>
    )
}

export { MyRecipesPage as default }