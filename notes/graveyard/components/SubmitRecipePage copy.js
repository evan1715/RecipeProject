import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import recipeServerAPI from '../../../client/src/database/recipeServerAPI.js';
import { clearErrorAction } from '../../../client/src/actions/serverError.js';
import { clearUserRecipesAction } from '../../../client/src/actions/userRecipes.js';

const SubmitRecipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userState = useSelector(state => state.accountReducer);
    const userRecipeState = useSelector(state => state.userRecipesReducer);
    const serverError = useSelector(state => state.serverErrorReducer);
    const [response, setResponse] = useState();
    const [title, setTitle] = useState(''); //title of recipe
    const [cookTime, setCookTime] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [ingredientAmount, setIngredientAmount] = useState();
    const [ingredientMeasurement, setIngredientMeasurement] = useState(); //must be string
    const [ingredientItem, setIngredientItem] = useState(); //must be string
    const [instructions, setInstructions] = useState('');

    //Submit the recipe to the server
    const submitRecipe = () => {
        const token = userState.token;
        const config = { title, cookTime, ingredients, instructions, token }
        
        if (ingredients.length > 0) {
            dispatch(clearErrorAction());
            dispatch(recipeServerAPI('submitRecipe', config));
        } else {
            setResponse("You have to add ingredients!");
        }
    }

    //Add the ingredients with the details of amount, measurement, item type to an array.
    const handleAddIngredients = () => {
        setIngredients(prevState => [...prevState, {
            amount: ingredientAmount,
            measurement: ingredientMeasurement,
            item: ingredientItem
        }]);
    }

    //Delete added ingredients as needed.
    const handleDeleteIngredient = (index) => {(
        setIngredients(prevState => {
            const newState = [...prevState];

            newState.splice(index, 1);

            return newState;
        })
    )}

    //Check if there's any server errors sent back whenever the state changes and display them.
    useEffect(() => {
            setResponse(serverError.error);
    }, [serverError]);

    useEffect(() => {
        if (userRecipeState._id) {
            setResponse("Submitted!");
            // setTimeout(() => {
                // history.push('/');
                dispatch(clearUserRecipesAction());
            // }, 2000);
        }
    }, [userRecipeState._id]);

    return (
        <div>
            <h1 className="title">Submit a recipe</h1>
            <form>
                <h3 className="title">Title for your recipe:</h3>
                <input 
                    className="modal__form--input" 
                    placeholder="recipe title"
                    onChange={ (e) => setTitle(e.target.value) }
                />
                
                <h3 className="title">Total cook time to make the food:</h3>
                <input 
                    className="modal__form--input" 
                    placeholder="cook time (in minutes)"
                    onChange={ (e) => setCookTime(e.target.value) }
                />

                <h3 className="title">Ingredients are entered as the amount, the measurement of it, and what the item is (ex: chicken):</h3>

                {/* Show them the ingredients they've added. */}
                { ingredients.map((ingredient, index) => {
                    return (
                        <div key={ index }>
                            <p>{ ingredient.amount } { ingredient.measurement } of { ingredient.item }</p>
                            <button onClick={ (e) => (e.preventDefault(), handleDeleteIngredient(index)) }>Remove</button>
                        </div>
                    )
                })}

                <ol>
                    <li><input 
                        className="modal__form--input" 
                        placeholder="amount"
                        onChange={ (e) => setIngredientAmount(e.target.value) }
                    /></li>
                    <li>
                        <input className="modal__form--input" placeholder="measurement" onChange={ (e) => setIngredientMeasurement(e.target.value) } />
                    </li>
                    <li>
                        <input className="modal__form--input" placeholder="ingredient" onChange={ (e) => setIngredientItem(e.target.value) }/>
                    </li>
                    <button onClick={ (e) => (e.preventDefault(), handleAddIngredients())}>Add an ingredient</button>
                </ol>

                <h3 className="title">Detailed instructions on how to make it:</h3>
                <input 
                    className="modal__form--input" 
                    placeholder="instructions and details"
                    onChange={ (e) => setInstructions(e.target.value) }
                />
            </form>
            { response && <p>{ response }</p> }
                <button className="button" onClick={ () => {
                    dispatch(clearErrorAction());
                    history.push('/');
                }}>Cancel</button>
                <button className="button" onClick={ submitRecipe }>Submit</button>
        </div>
    )
}

export { SubmitRecipe as default }