import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token } = useSelector(state => state.accountReducer);
    const userRecipes = useSelector(state => state.userRecipesReducer);
    const [selectedRecipe, setSelectedRecipe] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [approveEditRecipePush, setApproveEditRecipePush] = useState(false);

    //get a recipe by id
    //update a recipe
    //delete a recipe
    //upload pictures to recipe
    //delete pictures of recipe

    const handleDeleteRecipe = (recipe_id) => {
        const config = { recipe_id, token }
        dispatch(recipeServerAPI('deleteRecipe', config));
    }

    //Get the recipes when page initializes.
    useEffect(() => {
        dispatch(recipeServerAPI('myRecipes', user.username));
    }, []);

    //Get the recipes after one has been deleted.
    useEffect(() => {
        if (userRecipes.recipe === null) {
            dispatch(recipeServerAPI('myRecipes', user.username));
        }
    }, [userRecipes.recipe]);

    useEffect(() => {
        if (approveEditRecipePush) {
            history.push('/editrecipe');
        }
    }, [userRecipes])

    return (
        <div>
            <h1 className="title">My Recipes</h1>
            { userRecipes.length < 1 && <p>You haven't submitted any recipes yet!</p> }
            { userRecipes.length > 0 && userRecipes.map((recipe) => (
                <div key={ recipe._id }>
                    <li>{ recipe.title }</li>
                    <button>View</button>
                    <button onClick={ () => {
                        dispatch(recipeServerAPI('getRecipe', recipe._id));
                        setApproveEditRecipePush(true);
                    }}>Edit</button>
                    <button onClick={ () => (setConfirmDelete(true), setSelectedRecipe(recipe._id)) }>Delete</button>
                    { confirmDelete && (recipe._id === selectedRecipe) && 
                        <p>
                            Are you sure?
                            <button onClick={ () => handleDeleteRecipe(recipe._id) }>Yes</button><button onClick={ () => setConfirmDelete(false) }>No</button>
                        </p>
                    }
                </div>
            ))}
        </div>
    )
}

export { MyRecipesPage as default }