import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import handleRecipeRoulette from '../../actions/recipe-roulette';

// Recipe Roulette idea: This component will display 10 cards each containing a random recipe. If the user doesn't like any of the recipes on the
// cards, then some animation will trigger and continue until 10 new recipes have been received from the API and can be displayed
// on the page.

const RecipeRoulette = () => {
    const dispatch = useDispatch();
    const recipeRoulette = useSelector(state => state.recipeRoulette);
    const url = 'https://api.spoonacular.com/recipes/random';

    //Transition state and variables
    const [inProp, setInProp] = useState(true);
    const defaultStyle = { transition: 'opacity 400ms ease-in-out', opacity: 0 }
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    }

    useEffect(() => {
        if (recipeRoulette.length < 1) {
            dispatch(handleRecipeRoulette(url, 10));
        }
        setTimeout(() => setInProp(true), 800);
    }, [inProp]);

    return (
        <div className="recipe-roulette">
            <div className="recipe-roulette__header">
                <h1 className="title">Recipe Roulette</h1>
                <h2 className="title">Nothing piquing your interest? Take it for a
                    <button className="button" onClick={ () => {
                        setInProp(false);
                        dispatch(handleRecipeRoulette(url, 10))
                    }}>
                        spin!
                    </button>
                </h2>
            </div>

            <div className="recipe-roulette__cards">
                { recipeRoulette.map((recipe, index) => (
                    <Transition in={ inProp } key={ index } timeout={ 800 }>
                        { state => (
                            <div className="recipe-roulette__cards--card" style={{ ...defaultStyle, ...transitionStyles[state] }}>
                                <Link to={ `/recipe?type=spoon?id=${recipe.id}` }>
                                    <img alt="finished dish" src={ recipe.image } />
                                </Link>
                                <Link className="cursor" to={ `/recipe?type=spoon?id=${recipe.id}` }>
                                    <h3 className="recipe-roulette__cards--title">{ recipe.title }</h3>
                                </Link>
                                <p>
                                    {/* This svg/path part was sourced from the compiled version of displaying IoTimeOutline from react-ionicons@3.1.4.
                                        Visit npmjs.com/package/react-ionicons for the full package.
                                        Getting rid of the module saves 54kb on bundle size and the package has major vulnerabilities, so I'm using this instead. */}
                                    <svg fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024" rotate="0">
                                        <path d="M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 
                                        893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 
                                        381.4-381.4 381.4z M512 512h-192v34.6h226.6v-290.6h-34.6z" />
                                    </svg> { recipe.readyInMinutes } minutes</p>
                                <p>Popularity rating: { recipe.spoonacularScore }</p>
                            </div>
                        )}
                    </Transition>
                ))}
            </div>
        </div>
    )
}

export { RecipeRoulette as default }