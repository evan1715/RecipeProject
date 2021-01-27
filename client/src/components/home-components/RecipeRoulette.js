import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleRecipeRoulette } from '../../actions/recipe-roulette'
import IoTimeOutline from 'react-ionicons/lib/IosTimeOutline'
import { Transition } from 'react-transition-group'

// Recipe Roulette idea: This component will display 10 cards each containing a random recipe. If the user doesn't like any of the recipes on the
// cards, then some animation will trigger and continue until 10 new recipes have been received from the API and can be displayed
// on the page.

export default function RecipeRoulette() {
    const dispatch = useDispatch()
    const recipeRoulette = useSelector(state => state.recipeRoulette)
    const url = 'https://api.spoonacular.com/recipes/random'

    // Transition state + variables
    const [inProp, setInProp] = React.useState(true)
    const duration = 300
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    }
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }

    }

    React.useEffect(() => {
        dispatch(handleRecipeRoulette(url, 10))
    }, [dispatch])

    // After 800ms, set inProp to true so that the cards fade back onto the screen after the API request finishes
    React.useEffect(() => {
        const timeout = setTimeout(() => setInProp(true), 800)

        return () => clearTimeout(timeout)
    }, [inProp])

    return (
        <div className='center recipe-roulette'>
            <div>
                <h1 className='title'>Recipe Roulette</h1>
                <h2 className='title'>Nothing piquing your interest? Take it for a 
                    <button 
                        className='button' 
                        onClick={() => { setInProp(false); dispatch(handleRecipeRoulette(url, 10))}}
                    >
                        spin!
                    </button>
                </h2>

                <div className='recipe-roulette-cards-container'>
                    {recipeRoulette.map((recipe, index) => (
                        <Transition in={inProp} timeout={800}>
                            {state => (
                                <div style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}>
                                    <li key={index} className='recipe-roulette-card'>
                                        <img src={recipe.image} alt='finished dish' />
                                        <p>{recipe.title}</p>
                                        <p><IoTimeOutline /> {recipe.readyInMinutes} minutes</p>
                                        <p>Popularity Rating: {recipe.spoonacularScore}</p>
                                    </li>
                                </div>
                            )}
                        </Transition>
                    ))}
                </div>
            </div>
        </div>
    )
}