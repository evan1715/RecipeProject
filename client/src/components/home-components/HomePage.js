import React from 'react'
import CreateAnAccount from './CreateAnAccount'
// import { useDispatch } from 'react-redux'
// import { handleRandomRecipes } from '../../actions/random-recipes'
// import FilterByIngredient from './FilterByIngredient'
// import RandomRecipe from './RandomRecipe'

// // url is a placeholder, the actual url will be whatever the endpoint is for the spoonacular API

// Commented out below is the original HomePage design, trying out something different after
// seeing mysaffronapp.com


// export default function HomePage() {
//     const dispatch = useDispatch()

//     React.useEffect(() => {
//         dispatch(handleRandomRecipes(`https://api.spoonacular.com/recipes/random`, '5'))
//     }, [dispatch])

//     return (
//         <div className='container'>
//             <FilterByIngredient />

//             <h1 id='random-recipe-header'>Random Recipes</h1>
//             <hr />
            
//             <RandomRecipe />
//         </div>
//     )
// }

export default function HomePage() {
    return (
        <div className='container'>
            <CreateAnAccount /> 
        </div>
    )
}

