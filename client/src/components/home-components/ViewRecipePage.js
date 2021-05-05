import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const ViewRecipePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userRecipe = useSelector(state => state.userRecipesReducer);
    const [username, setUsername] = useState('account no longer exists');
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
        dispatch(showLoading());
        dispatch(recipeServerAPI('getRecipe', location.search.split('?id=')[1]));
    }, []);

    useEffect(async () => {
        //Only call the slideshow if there is any pictures.
        if (userRecipe.pictures && userRecipe.pictures.length > 0) {
            showSlides(slideIndex);
        }
        //Only send this out if we got anything.
        if (userRecipe.owner) {
            setUsername(await (await fetch(`/user/username/${userRecipe.owner}`)).json());
        }
    }, [userRecipe.pictures]);
    
    return (
        <div>
            { userRecipe.title && //Only render once we have the recipe.
            <div>
                <h1 className="title center">{ userRecipe.title }</h1>

                <p className="center">Submitted by: { username }</p>
                <p className="center">Submitted: { userRecipe.createdAt }</p>
                {/*If a recipe is created on the same day it's submitted, we don't have to display updated.*/
                    userRecipe.createdAt !== userRecipe.updatedAt
                    &&
                    <p className="center">Last updated: { userRecipe.updatedAt }</p>
                }

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

                <p className="center">Cook time: { userRecipe.cookTime } minutes.</p>

                <ul>
                    <h3 className="title center">Ingredients:</h3>
                    { userRecipe.ingredients.map((ingredient) => (
                        <li className="center" key={ ingredient._id }>
                            { ingredient.amount } { ingredient.measurement } of { ingredient.item }
                        </li>
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