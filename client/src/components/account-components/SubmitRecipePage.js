import React, { useState } from 'react';

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

        </div>
    )
}

export { SubmitRecipe as default }