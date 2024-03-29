import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { showLoading } from 'react-redux-loading-bar';
import LeftColumn from './LeftColumn.js';
import RightColumn from './RightColumn.js';
import ModifyPicturesModal from './ModifyPicturesModal.js';
import { editRecipeAction, clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

Modal.setAppElement('#root');

const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token } = useSelector(state => state.accountReducer);
    const userRecipes = useSelector(state => state.userRecipesReducer);
    const [selectedRecipe, setSelectedRecipe] = useState();
    const [selectedPictures, setSelectedPictures] = useState([]);
    const [openModifyPicturesModal, setOpenModifyPicturesModal] = useState(false);
    const [openDeleteRecipeModal, setOpenDeleteRecipeModal] = useState(false);

    const handleEditRecipe = (recipe) => {
        dispatch(editRecipeAction(recipe));
        history.push(`/editrecipe?${recipe._id}`);
    }

    const handleDeleteRecipe = (recipe_id) => {
        dispatch(recipeServerAPI('deleteRecipe', { recipe_id, token }));
        setOpenDeleteRecipeModal(false);
    }

    useEffect(() => {
        //Once a recipe is deleted, retrieve all recipes again.
        if (userRecipes.recipe === null) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('myRecipes', user.username));
        }
    }, [userRecipes]);

    return (
        <>
        <h1 className="columns-header">My Recipes</h1>
        <div className="columns">

            <div className="columns__left columns--hide">
                <LeftColumn isPublic={ false } />
            </div>

            <div className="columns__center">
                { userRecipes.length > 0 &&
                    <Link to="/submitrecipe">
                        <button className="button">Submit a New Recipe</button>
                    </Link>
                }

                <h2 className="columns__title" style={{ fontSize: 30 }}>My Submitted Recipes</h2>
                { userRecipes.length < 1 && 
                <>
                    <p className="center">You haven't submitted any recipes yet!</p>
                    <button className="button__link" onClick={ () => dispatch(clearSelectedRecipeAction()) }>
                        <Link className="button__link--Link" to="/submitrecipe">Submit a new recipe</Link>
                    </button>
                </>
                }
                { userRecipes.length > 0 && userRecipes.map((recipe) => (
                    <div className="my-recipes" key={ recipe._id }>
                        <h3 className="title center" style={{ fontSize: 30 }}>{ recipe.title }</h3>

                        <div className="my-recipes-buttons">
                            <button className="button__link">
                                <Link className="button__link--Link" to={ `/recipe?id=${recipe._id}` }>View</Link>
                            </button>

                            <button className="button" onClick={ () => handleEditRecipe(recipe)}>
                                Edit
                            </button>

                            <button className="button" onClick={ () => {
                                setOpenModifyPicturesModal(true);
                                setSelectedRecipe(recipe);
                                setSelectedPictures(recipe.pictures);
                            }}>Modify pictures</button>
                            <ModifyPicturesModal
                                openModifyPicturesModal={ openModifyPicturesModal }
                                handleCloseModal={ () => setOpenModifyPicturesModal(false) }
                                recipe_id={ selectedRecipe && selectedRecipe._id }
                                pictures={ selectedPictures }
                            />

                            <button className="button" onClick={ () => {
                                setOpenDeleteRecipeModal(true);
                                setSelectedRecipe(recipe)
                            }}>Delete</button>
                            <Modal
                                className="modal"
                                closeTimeoutMS={ 250 }
                                contentLabel="Delete this recipe"
                                isOpen={ openDeleteRecipeModal }
                                onRequestClose={ () => setOpenDeleteRecipeModal(false) }
                            >
                                <h2 className="title">Are you sure you want to delete { selectedRecipe && selectedRecipe.title }?</h2>
                                <button className="button" onClick={ () => handleDeleteRecipe(recipe._id) }>Yes</button>
                                <button className="button" onClick={ () => setOpenDeleteRecipeModal(false) }>No</button>
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>

            <div className="columns__right columns--hide">
                <RightColumn isPublic={ false } />
            </div>

        </div></>
    )
}

export { MyRecipesPage as default }