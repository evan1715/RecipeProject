import React from 'react'
import CreateAccount from './CreateAccount'
import RecipeRoulette from './RecipeRoulette'
// import { useDispatch } from 'react-redux'
// import { handleRandomRecipes } from '../../actions/random-recipes'
// import RandomRecipe from './RandomRecipe'

export default function HomePage() {
    return (
        <div className='container column'>
            <CreateAccount /> 
            <RecipeRoulette />
        </div>
    )
}

