import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar'
import ModifyPicturesModal from './ModifyPicturesModal.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token } = useSelector(state => state.accountReducer);
    const userRecipes = useSelector(state => state.userRecipesReducer);
    const [selectedRecipe, setSelectedRecipe] = useState();
    const [selectedPictures, setSelectedPictures] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [approveEditRecipePush, setApproveEditRecipePush] = useState(false);
    const [openModifyPicturesModal, setOpenModifyPicturesModal] = useState(false);

    const handleEditRecipe = (recipe_id) => {
        dispatch(showLoading());
        dispatch(recipeServerAPI('getRecipe', recipe_id));
        setApproveEditRecipePush(true);
    }

    const handleDeleteRecipe = (recipe_id) => {
        const config = { recipe_id, token }
        dispatch(recipeServerAPI('deleteRecipe', config));
    }

    //Get the recipes when page initializes.
    useEffect(() => {
        dispatch(showLoading());
        dispatch(recipeServerAPI('myRecipes', user.username));
    }, []);

    //Get the recipes after one has been deleted.
    useEffect(() => {
        if (userRecipes.recipe === null) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('myRecipes', user.username));
        }
    }, [userRecipes.recipe]);

    useEffect(() => {
        if (approveEditRecipePush) {
            history.push('/editrecipe');
        }
    }, [userRecipes])

    return (
        <div className="my-recipes-page">
            <h1 className="title center">My Recipes</h1>
            { userRecipes.length < 1 && <p>You haven't submitted any recipes yet!</p> }
            { userRecipes.length > 0 && userRecipes.map((recipe) => (
                <div className="my-recipes" key={ recipe._id }>
                    <li className="center" style={{ fontSize: 30 }}>{ recipe.title }</li>

                    <div className="my-recipes-buttons">
                        <button className="button" onClick={ () => history.push(`/recipe?id=${recipe._id}`) }>
                            View
                        </button>

                        <button className="button" onClick={ () => handleEditRecipe(recipe._id)}>
                            Edit
                        </button>

                        <button className="button" onClick={ () => {
                            setOpenModifyPicturesModal(true);
                            setSelectedRecipe(recipe._id);
                            setSelectedPictures(recipe.pictures);
                        }}>Modify pictures</button>
                        <ModifyPicturesModal
                            openModifyPicturesModal={ openModifyPicturesModal }
                            handleCloseModal={ () => setOpenModifyPicturesModal(false) }
                            recipe_id={ selectedRecipe }
                            pictures={ selectedPictures }
                        />

                        <button className="button" onClick={ () => (setConfirmDelete(true), setSelectedRecipe(recipe._id)) }>Delete</button>
                        { confirmDelete && (recipe._id === selectedRecipe) && 
                            <p style={{ fontSize: 30 }}>
                                Are you sure?
                                <button className="button" onClick={ () => handleDeleteRecipe(recipe._id) }>Yes</button>
                                <button className="button" onClick={ () => setConfirmDelete(false) }>No</button>
                            </p>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export { MyRecipesPage as default }