import React, { 
    useState, 
    useEffect, 
    // useLayoutEffect 
} from 'react';
// import { useHistory } from 'react-router-dom';
// import { 
//     useDispatch, 
//     useSelector 
// } from 'react-redux';
// import recipeServerAPI from '../../database/recipeServerAPI.js';


const AllRecipesPage = () => {
    // const dispatch = useDispatch();
    // const allRecipes = useSelector(state => state.userRecipesReducer);
    const [recipes, setRecipes] = useState([]);
    // const recipes = await (await fetch('/recipes/all')).json();

    useEffect(async () => {
        const data = await (await fetch('/recipes/all')).json();
        setRecipes(data);
        // dispatch(recipeServerAPI('allRecipes'));
    }, []);

    return (
        <ul>
            { recipes.length > 0 && recipes.map((recipe, index) => {
                return (
                    <li key={ index }>
                        <p>Title: { recipe.title } Cooktime: { recipe.cookTime } Instructions: { recipe.instructions }</p>
                    </li>
                )
            })}
        </ul>
    );
}

export { AllRecipesPage as default }