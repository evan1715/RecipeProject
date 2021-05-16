import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { showLoading } from 'react-redux-loading-bar';

const Slideshow = (props) => {
    const userRecipe = props.pictures;
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
        //Only call the slideshow if there is any pictures.
        if (userRecipe && userRecipe.length > 0) {
            showSlides(slideIndex);
        }
        //Only send this out if we got anything.
    }, [userRecipe]);

    return (
        <div>
            {/* Only load the picture section if the recipe has pictures. */}
            { userRecipe.length > 0 &&
                <div className="pictures-container">
                    { userRecipe.map((pic, index) => (
                        <div key={ pic._id } className="pictures-slides fade">
                            <div className="number-of">{ index + 1 } of { userRecipe.length }</div>
                            <img 
                                style={{ width: '100%' }}
                                src={ `data:image/jpeg;base64,${pic.picture.data}` }
                            />
                        </div>
                    ))}
                    <a className="prev" onClick={ () => plusSlides(-1) }>&#10094;</a>
                    <a className="next" onClick={ () => plusSlides(1) }>&#10095;</a>

                    {/* <div className="row">
                        { userRecipe.map((pic, index) => (
                            <div key={ pic._id } className="column">
                                <img
                                    className="thumbnail"
                                    style={{ width: '100%' }}
                                    src={ `data:image/jpeg;base64,${pic.picture.data}` }
                                    onClick={ () => currentSlide(index + 1) }
                                />
                            </div>
                        ))}
                    </div> */}
                </div>
            }
        </div>
    )
}

export { Slideshow as default }