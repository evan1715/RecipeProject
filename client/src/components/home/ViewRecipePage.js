import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const ViewRecipePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userRecipe = useSelector(state => state.selectedRecipeReducer);
    const [username, setUsername] = useState('Account Not Found');
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

    useEffect(() => {
        const id = location.search.split('?id=')[1];
        
        //Check if this recipe is already stored before fetching again.
        if (userRecipe._id !== id) {
            dispatch(showLoading());
            dispatch(recipeServerAPI('getRecipe', id));
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
        <>{ userRecipe.title && //Only render once we have the recipe.
            <div>
                <h1 className="title center">{ userRecipe.title }</h1>

                <div className="view-recipe__userinfo">
                    <p className="view-recipe__userinfo--p">Submitted by: { username }</p>
                    <p className="view-recipe__userinfo--p">Submitted: { userRecipe.createdAt }</p>
                    {/*If a recipe is created on the same day it's submitted, we don't have to display updated.*/
                        userRecipe.createdAt !== userRecipe.updatedAt
                        &&
                        <p className="view-recipe__userinfo--p">Last updated: { userRecipe.updatedAt }</p>
                    }
                </div>

                {/* Only load the picture section if the recipe has pictures. */}
                { userRecipe.pictures.length > 0 &&
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

                        <div className="row">
                            { userRecipe.pictures.map((pic, index) => (
                                <div key={ pic._id } className="column">
                                    <img
                                        className="thumbnail"
                                        style={{ width: '100%' }}
                                        src={ `data:image/jpeg;base64,${pic.picture.data}` }
                                        onClick={ () => currentSlide(index + 1) }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }

                <div className="view-recipe__recipe">
                    <div className="view-recipe__recipe--cook-time">
                        <h2 className="title center">Cook time:</h2>
                        <p className="center">{ userRecipe.cookTime } minutes.</p>
                    </div>
                    <div className="view-recipe__recipe--ingredients">
                        <h2 className="title center">Ingredients:</h2>
                        { userRecipe.ingredients.map((ingredient) => (
                            <li key={ ingredient._id }>
                                - { ingredient.amount } { ingredient.measurement } of { ingredient.item }
                            </li>
                        ))}
                    </div>
                    
                    <div className="view-recipe__recipe--instructions">
                        <h2 className="title center">Instructions:</h2>
                        <blockquote className="center">{ userRecipe.instructions }</blockquote>
                    </div>
                </div>
            </div>
            }
        </>
    )
}


export { ViewRecipePage as default }