import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar';
import { viewRecipeAction } from '../../actions/selectedRecipe.js';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const ViewRecipePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userRecipe = useSelector(state => state.selectedRecipeReducer);
    const [username, setUsername] = useState('Account Not Found');
    const spoon = location.search.split('?type=')[1];
    let slideIndex = 1;

    const plusSlides = (n) => showSlides(slideIndex += n);
    const currentSlide = (n) => showSlides(slideIndex = n);
    const showSlides = (n) => {
        let slides = document.getElementsByClassName("pictures-slides");
        
        //If n is more than the total slide because of "next" button, return to the first one.
        if (n > slides.length) {
            slideIndex = 1;
        }
        //If n is less than one because of "prev" button, return to the last one.
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex-1].style.display = "block";
    }

    useEffect(async () => {
        const id = location.search.split('?id=')[1];
        const key = '?apiKey=3273002619e04c89b625192940c7dbb1';
        
        //Check if this recipe is already stored before fetching again.
        if (userRecipe._id !== id && !spoon) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('getRecipe', id));
        }

        if (spoon) {
            const spoonRecipe = await (await fetch(`https://api.spoonacular.com/recipes/${id}/information${key}`)).json();
            dispatch(viewRecipeAction(spoonRecipe));
            console.log(spoonRecipe);
        }
    }, []);

    useEffect(async () => {
        //Only call the slideshow if there is any pictures.
        if (userRecipe.pictures && userRecipe.pictures.length > 0) {
            showSlides(slideIndex);
        }
        //Only send this out if we got anything.
        if (location.search.split('?id=')[1] === userRecipe._id) {
            setUsername(await (await fetch(`/user/username/${userRecipe.owner}`)).json());
        }
    }, [userRecipe.pictures]);
    
    return (
        <div className="view-recipe">{ userRecipe.title && //Only render once we have the recipe.
            <>
                <h1 className="title center">{ userRecipe.title }</h1>

                { !spoon ?
                    <div className="view-recipe__userinfo">
                        <p className="view-recipe__userinfo--p">Submitted by: { username }</p>
                        <p className="view-recipe__userinfo--p">Submitted: { userRecipe.createdAt }</p>
                        {/*If a recipe is created on the same day it's submitted, we don't have to display updated.*/
                            userRecipe.createdAt !== userRecipe.updatedAt
                            &&
                            <p className="view-recipe__userinfo--p">Last updated: { userRecipe.updatedAt }</p>
                        }
                    </div>
                    :
                    //Reference source if it's spoonacular.
                    <div className="view-recipe__userinfo">
                        <p className="view-recipe__userinfo--p">
                            <a className="cursor" target="_blank" href={ userRecipe.spoonacularSourceUrl }>
                                Spoonacular Source
                            </a>
                        </p>
                        <p className="view-recipe__userinfo--p">
                            <a className="cursor" target="_blank" href={ userRecipe.sourceUrl }>
                                Original Source
                            </a>
                        </p>
                    </div>
                }

                {/* Only load the picture section if the recipe has pictures. */}
                { userRecipe.pictures && userRecipe.pictures.length > 0 &&
                    <div className="pictures-container">
                        { userRecipe.pictures.map((pic, index) => (
                            <div key={ pic._id } className="pictures-slides fade">
                                <div className="number-of">{ index + 1 } of { userRecipe.pictures.length }</div>
                                <img
                                    style={{ width: '100%' }}
                                    src={ `data:image/jpeg;base64,${pic.picture.data}` }
                                />
                            </div>
                        ))}
                        <a className="prev" onClick={ () => plusSlides(-1) }>&#10094;</a>
                        <a className="next" onClick={ () => plusSlides(1) }>&#10095;</a>
                        
                        { userRecipe.pictures && userRecipe.pictures.length > 1 &&
                            <div className="gallery-container">
                                { userRecipe.pictures.map((pic, index) => (
                                    <div key={ pic._id } className="thumbnail-container">
                                        <img
                                            className="thumbnail"
                                            key={ pic._id }
                                            onClick={ () => currentSlide(index + 1) }
                                            src={ `data:image/jpeg;base64,${pic.picture.data}` }
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }

                {/* If it's a spoon recipe, we'll show this image. */}
                { userRecipe.image &&
                    <div className="pictures-container">
                        <img
                            style={{ width: '100%' }}
                            src={ userRecipe.image }
                        />
                    </div>
                }

                <div className="view-recipe__recipe">
                    <div className="view-recipe__recipe--cook-time">
                        <h2 className="title center">Cook time:</h2>
                        <p className="center">{ userRecipe.cookTime ? userRecipe.cookTime : userRecipe.readyInMinutes } minutes.</p>
                    </div>
                    
                    <div className="view-recipe__recipe--ingredients">
                        <h2 className="title center">Ingredients:</h2>
                        { userRecipe.ingredients ?
                            //User recipe ingredients
                            userRecipe.ingredients.map((ingredient) => (
                                <li key={ ingredient._id }>
                                    - { ingredient.amount } { ingredient.measurement } of { ingredient.item }
                                </li>
                            ))
                            :
                            //Spoonacular recipe ingredients
                            userRecipe.extendedIngredients.map((ingredient) => (
                                <li key={ ingredient.id }>
                                    - { ingredient.measures.us.amount } { ingredient.measures.us.unitShort } of { ingredient.name }
                                </li>
                            ))
                        }
                    </div>
                    
                    <div className="view-recipe__recipe--instructions">
                        <h2 className="title center">Instructions:</h2>
                        <blockquote className="center">{
                            userRecipe.instructions ?
                                userRecipe.instructions
                                :
                                //In the case that the recipe does not have instructions, direct them.
                                <a className="cursor" href={ userRecipe.sourceUrl }>Click here to view the original source for instructions.</a>
                        }</blockquote>
                    </div>
                </div>
            </>
            }
        </div>
    )
}


export { ViewRecipePage as default }