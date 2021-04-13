import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const SubmitRecipe = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.accountReducer);
    const userRecipeState = useSelector(state => state.userRecipesReducer);
    const serverError = useSelector(state => state.serverError);
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
        
        if (ingredients) {
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

            return [...newState];
        })
    )}

    //Check if there's any server errors sent back whenever the state changes and display them.
    useEffect(() => {
        if (serverError.errors) {
            setResponse(serverError.message);
        }
    }, [serverError]);

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
                <button className="button">Cancel</button>
                <button className="button" onClick={ submitRecipe }>Submit</button>
        </div>
    )
}

export { SubmitRecipe as default }