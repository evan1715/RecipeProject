import React from 'react'
import CreateAccount from './CreateAccount'
import RecipeRoulette from './RecipeRoulette'

export default function HomePage() {
    return (
        <div className='container column'>
            <CreateAccount /> 
            <RecipeRoulette />
        </div>
    )
}

