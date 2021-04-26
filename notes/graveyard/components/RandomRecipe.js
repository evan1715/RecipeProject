import React from 'react'
import { useSelector } from 'react-redux'
import IoTimeOutline from 'react-ionicons/lib/IosTimeOutline'

export default function RandomRecipe() {
    const recipes = useSelector(state => state.randomRecipes)
    
    React.useEffect(() => {
        console.log(recipes)
    }, [recipes])

    return (
        <div> 
            {recipes.map((recipe, index) => (
                <div className='random-recipe-container' key={index}>
                    <img src={recipe.image} alt='dish' />
                    <div>
                        <h1 className='title'>{recipe.title} </h1>
                        <h2><IoTimeOutline style={{paddingRight: 5}} />{recipe.readyInMinutes} minutes</h2>
                        <p>{recipe.summary.substr(0, 525).concat('...')}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}