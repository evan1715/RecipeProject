import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IoTimeOutline from 'react-ionicons/lib/IosTimeOutline';
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
                                <Link className="link" to={ `/recipe?type=spoon?id=${recipe.id}` }>
                                    <h3>{ recipe.title }</h3>
                                </Link>
                                <p><IoTimeOutline /> { recipe.readyInMinutes } minutes</p>
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