import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const ViewRecipePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userRecipe = useSelector(state => state.userRecipesReducer);
    let slideIndex = 1;

    const plusSlides = (n) => showSlides(slideIndex += n);
    const currentSlide = (n) => showSlides(slideIndex = n);
    const showSlides = (n) => {
        let slides = document.getElementsByClassName("pictures-slides");
        
        //If n is more than the total slide because of "next" button, return to the first one.
        if (n > slides.length) {
            slideIndex = 1 
        }
        //If n is less than one because of "prev" button, return to the last one.
        if (n < 1) {
            slideIndex = slides.length
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex-1].style.display = "block";
    }

    useEffect(() => {
        dispatch(showLoading());
        const recipe_id = location.search.split('?id=')[1];
        dispatch(recipeServerAPI('getRecipe', recipe_id));
    }, [])

    useEffect(() => {
        //Only call the slideshow if there is any pictures.
        if (userRecipe.pictures && userRecipe.pictures.length > 0) {
            showSlides(slideIndex);
        }
    }, [userRecipe.pictures])
    
    return (
        <div>
            { userRecipe.title && //Only render once we have the recipe.
            <div>
                <h1 className="title center">{ userRecipe.title }</h1>

                <p className="center">Submitted by: pending feature - owner_id: { userRecipe.owner }</p>
                <p className="center">Submitted: { userRecipe.createdAt }. Last updated: { userRecipe.updatedAt }</p>

                { userRecipe.pictures && //Only load the picture section if the recipe has pictures.
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