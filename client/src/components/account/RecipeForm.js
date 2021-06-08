import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorAction } from '../../actions/serverError.js';
import { clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';

const RecipeForm = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userState = useSelector(state => state.accountReducer);
    const selectedRecipe = useSelector(state => state.selectedRecipeReducer);
    const serverError = useSelector(state => state.serverErrorReducer);
    const [response, setResponse] = useState();
    const [title, setTitle] = useState(selectedRecipe.title ? selectedRecipe.title : ''); //title of recipe
    const [cookTime, setCookTime] = useState(selectedRecipe.cookTime ? selectedRecipe.cookTime : '');
    const [ingredients, setIngredients] = useState(selectedRecipe.ingredients ? selectedRecipe.ingredients : []);
    const [ingredientAmount, setIngredientAmount] = useState();
    const [ingredientMeasurement, setIngredientMeasurement] = useState(); //must be string
    const [ingredientItem, setIngredientItem] = useState(); //must be string
    const [instructions, setInstructions] = useState(selectedRecipe.instructions ? selectedRecipe.instructions : '');

    //Handle the submission
    const onSubmit = () => {
        const token = userState.token;
        const config = { title, cookTime, ingredients, instructions, token }

        //Check if there's ingredients added
        if (ingredients.length < 1) {
            setResponse("You have to add ingredients!");
        } else {
            props.onSubmit(config);
            if (serverError.error !== null) {
                dispatch(clearErrorAction());
            }
        }
    }

    //Handle cancel button click
    const handleCancel = () => {
        dispatch(clearErrorAction());
        dispatch(clearSelectedRecipeAction());
        history.push('/myrecipes');
    }

    //Add the ingredients with the details of amount, measurement, item type to an array.
    const handleAddIngredients = (e) => {
        e.preventDefault();
        setIngredients(prevState => [...prevState, {
            amount: ingredientAmount,
            measurement: ingredientMeasurement,
            item: ingredientItem
        }])
    }

    //Delete added ingredients as needed.
    const handleDeleteIngredient = (index) => (
        setIngredients(prevState => {
            const newState = [...prevState];
            newState.splice(index, 1);
            return newState;
        })
    );

    //Check if there's any server errors sent back whenever the state changes and display them.
    useEffect(() => {
        setResponse(serverError.error);
    }, [serverError]);

    return (
        <div className="recipe-form">
            <label className="recipe-form__labels" htmlFor="recipe-title">Title for your recipe:</label>
            <input
                className="modal__form--input"
                id="recipe-title"
                maxLength="64"
                onChange={ (e) => setTitle(e.target.value) }
                placeholder="recipe title"
                title="Title of recipe"
                type="text"
                value={ title }
            />
            
            <label className="recipe-form__labels" htmlFor="cook-time">Total cook time to make the food:</label>
            <input
                className="modal__form--input"
                id="cook-time"
                maxLength="4"
                onChange={ (e) => setCookTime(e.target.value) }
                placeholder="cook time (in minutes)"
                title="Cook time (in minutes)"
                type="number"
                value={ cookTime }
            />

            <label className="recipe-form__labels" htmlFor="ingredients">Ingredients are entered as the amount, the measurement of it, and what the item is (ex: chicken):</label>

            {/* Show them the ingredients they've added. */}
            <div className="recipe-form__added-ingredients">
                { ingredients.map((ingredient, index) => (
                    <li className="recipe-form__added-ingredients--list" key={ index }>
                        <p>{ ingredient.amount } { ingredient.measurement } of { ingredient.item }</p>
                        <button className="button" onClick={ (e) => (e.preventDefault(), handleDeleteIngredient(index)) }>Remove</button>
                    </li>
                ))}
            </div>

            <form className="recipe-form__add-ingredients" onSubmit={ (e) => handleAddIngredients(e) }>
                <input 
                    className="modal__form--input"
                    id="ingredients"
                    maxLength="4"
                    onChange={ (e) => setIngredientAmount(e.target.value) }
                    placeholder="amount"
                    required
                    title="amount"
                    type="number"
                />
                <select
                    className="modal__form--input"
                    onChange={ (e) => setIngredientMeasurement(e.target.value) }
                    required
                    title="measurement type">
                    <option />
                    <option value="tbsp">tbsp (tablespoon)</option>
                    <option value="tsp">tsp (teaspoon)</option>
                    <option value="oz">oz (ounce)</option>
                    <option value="fl-oz">fl. oz (fluid ounce)</option>
                    <option value="cup">cup</option>
                    <option value="quart">qt (quart)</option>
                    <option value="pint">pt (pint)</option>
                    <option value="lb">lb (pound)</option>
                    <option value="whole">whole</option>
                    <option value="pkg">pkg (package)</option>
                </select>
                <input
                    className="modal__form--input"
                    maxLength="32"
                    onChange={ (e) => setIngredientItem(e.target.value) }
                    placeholder="ingredient"
                    required
                    title="ingredient"
                    type="text"
                />
                <button className="button" title="Add ingredient" type="submit">Add</button>
            </form>

            <label className="recipe-form__labels" htmlFor="description">Detailed instructions on how to make it:</label>
            <textarea
                className="modal__form--input"
                id="description"
                onChange={ (e) => setInstructions(e.target.value) }
                placeholder="instructions and details"
                rows="10"
                title="Instructions for recipe"
                value={ instructions }
            />

            <p className="recipe-form__response">{ response && { response } }</p>

            <div className="recipe-form__buttons">
                <button className="button" onClick={ handleCancel } title="Cancel">Cancel</button>
                <button className="button" onClick={ onSubmit } title="Submit">Submit</button>
            </div>
        </div>
    )
}

export { RecipeForm as default }