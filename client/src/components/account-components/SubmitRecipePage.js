import React, { useState } from 'react';
import recipeServerAPI from '../../database/recipeServerAPI.js';

const SubmitRecipe = () => {
    const [title, setTitle] = useState(''); //title of recipe
    const [cookTime, setCookTime] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [pictures, setPictures] = useState();
    const [recipe, setRecipe] = useState([]);
    //owner for who submitted it? by id? const [owner, setOwner] = useState();

    //Let's submit recipes to local storage first so we can understand redux better. Then it'll be easy to send it to the API.

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
                <input 
                    className="modal__form--input" 
                    placeholder="ingredients"
                    onChange={ (e) => setIngredients(e.target.value) }
                />

                <h3 className="title">Detailed instructions on how to make it:</h3>
                <input 
                    className="modal__form--input" 
                    placeholder="instructions and details"
                    onChange={ (e) => setInstructions(e.target.value) }
                />
            </form>
                <button className="button">Cancel</button>
                <button className="button">Submit</button>
        </div>
    )
}

export { SubmitRecipe as default }