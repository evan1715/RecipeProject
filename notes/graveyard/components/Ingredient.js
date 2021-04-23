//PENDING COMPONENT
//Might create separate components for the SubmitRecipe page, but might also keep it on one file.

import React from 'react';

const Ingredient = () => (
    <ol 
    key={ index + 'ol' }
    onChange={ () => setIngredients([{ amount: ingredientAmount, measurement: ingredientMeasurement, item: ingredientItem }]) }
    >
        <li
        key={ index + 'amount' }
        >
            <input 
                className="modal__form--input"
                placeholder="amount"
                onChange={ (e) => setIngredientAmount(e.target.value) }
            />
        </li>
        <li
        key={ index + 'measurement' }
        >
            <input
            className="modal__form--input"
            placeholder="measurement"
            onChange={ (e) => setIngredientMeasurement(e.target.value) }
            />
        </li>
        <li
        key={ index + 'ingredient' }
        >
            <input
            className="modal__form--input"
            placeholder="ingredient"
            onChange={ (e) => setIngredientItem(e.target.value) }/>
        </li>
        <button onClick={ (e) => ( numOfIngredients.concat('1'), e.preventDefault(), console.log(numOfIngredients) ) }>Add another ingredient</button>
    </ol>
);

export { Ingredient as default }