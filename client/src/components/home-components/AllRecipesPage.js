import React, { 
    // useState, 
    useEffect, 
    // useLayoutEffect 
} from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoading } from 'react-redux-loading-bar';
import recipeServerAPI from '../../database/recipeServerAPI.js';


const AllRecipesPage = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.userRecipesReducer);
    // const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        dispatch(showLoading());
        dispatch(recipeServerAPI('allRecipes'));
    }, []);

    return (
        <ul>
            { allRecipes.length > 0 && allRecipes.map((recipe, index) => (
                <div key={ index } className="row">
                    <button className="button__link">
                        <Link className="button__link--Link" to={`/recipe?id=${recipe._id}`}>View</Link>
                    </button>
                    <p>Title: { recipe.title } Cook time: { recipe.cookTime } Instructions: { recipe.instructions }</p>
                </div>
            ))}
        </ul>
    );
}

export { AllRecipesPage as default }