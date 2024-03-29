/*  API POST options:
    Create a recipe
    - /recipes
    Upload pictures of recipes
    - /recipes/:id/pictures

    API GET options:
    Get all recipes, non-auth
    - /recipes/all
    Get a user's recipes
    - /recipes/user/:username
    Get a recipe by id
    - /recipes/:id
    Get recipe pictures
    - /recipes/:id/pictures

    API PATCH options:
    Update a recipe
    - /recipe/:id

    API DELETE options:
    Delete a recipe
    - /recipes/:id
    Delete picture(s) of recipe food
    - /recipes/:id/pictures
*/

import { hideLoading } from 'react-redux-loading-bar';
import { serverErrorAction } from '../actions/serverError.js';
import { allRecipesAction } from '../actions/allRecipes.js';
import {
    submitRecipeAction,
    myRecipesAction,
    deleteRecipeAction,
} from '../actions/userRecipes.js';
import { viewRecipeAction } from '../actions/selectedRecipe.js';

//Take in the call. Based on type, send it to a function as well as what's being passed into it (config).
const recipeServerAPI = (type, config) => {
    switch (type) {
        case 'submitRecipe': //post
            return submitRecipe(config); //token & recipe form
        case 'allRecipes': //get all recipes, non-auth
            return allRecipes(config);
        case 'myRecipes': //get a user's recipes
            return myRecipes(config); //username
        case 'getRecipe': //get by recipe id
            return getRecipe(config); //id
        case 'updateRecipe': //patch
            return updateRecipe(config) //id
        case 'deleteRecipe': //delete
            return deleteRecipe(config); //id
        case 'uploadPictures': //post
            return uploadPictures(config); //token & pictures
        case 'deletePictures': //delete
            return deletePictures(config); //token & id
    }
}


//Handle the responses with console logs.
const handleResponse = (res) => {
    if (res.ok) { //if res.status = 200-299
        console.log(res.status, "Server URL success. Server response: ", res);
    } else if (!res.ok) { //if res.status = 400-599
        console.log(res.status, "Server URL unsuccessful.", res);
    }
    return res.json();
}

const handleResponseNoJSON = (res) => {
    if (res.ok) { //if res.status = 200-299
        console.log(res.status, "Server URL success. Server response: ", res);
    } else if (!res.ok) { //if res.status = 400-599
        console.log(res.status, "Server URL unsuccessful.", res);
    }
}

//Handle errors sent back in data.
const handleDataError = (data) => {
    let message;
    const dErrs = data.errors;
    const dMsg = data.message;

    if (data.name === 'MongoError') {
        message = data;
    } else if (data.error) {
        message = data.error;
    }
    
    if (dErrs) {
        if (dErrs.instructions && dErrs.instructions.kind === 'required') {
            message = "Instructions for your recipe are required.";
        } else if (dErrs.title && dErrs.title.kind === 'required') {
            message = "Title for your recipe is required.";
        } else if (dErrs.cookTime) {
            message = "Cook time must be a positive number.";
        }

        if (dErrs.instructions && dErrs.instructions.message.includes('profanity')) {
            message = dErrs.instructions.message;
        } else if (dErrs.title && dErrs.title.message.includes('profanity')) {
            message = dErrs.title.message;
        }

        if (dErrs.title & dErrs.title.message.includes('characters')) {
            message = dErrs.title.message;
        }
    }
    
    if (dMsg) {
        if (dMsg.includes('Path')) {
            if (dMsg.includes('amount') || dMsg.includes('measurement') || dMsg.includes('item')) {
                message = "All three fields of amount, measurement, and ingredient type are required for each added ingredient.";
            }
        }
        if (dMsg.includes('profanity')) {
            if (dMsg.includes('amount') || dMsg.includes('measurement') || dMsg.includes('item')) {
                message = "Ingredients cannot contain profanity.";
            }
        }
        if (dMsg.includes('Cast to Number failed')) {
            message = "Number not accepted. Could be a fractional error. Try converting to decimal.";
        }
        console.log(data.message);
    }

    return message;
}

//Handle errors caught by catch.
const handleCatchError = (error) => {
    if (error) {
        console.log("Catch response error message: ", error);
    }
}


//Submit a recipe
const submitRecipe = (config) => {
    const { title, cookTime, ingredients, instructions, token } = config;
    //ingredients is an array containing amount{}, measurement{}, item{}

    return dispatch => {
        fetch('/recipes', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                cookTime: cookTime,
                ingredients: ingredients,
                instructions: instructions
            })
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            if (data._id) {
                dispatch(submitRecipeAction(data));
            } else if (data.errors) {
                dispatch(serverErrorAction(handleDataError(data)));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Get all recipes, non-authorized
const allRecipes = () => {
    return dispatch => {
        fetch('/recipes/all', {
            method: 'GET'
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            dispatch(allRecipesAction(data));
            dispatch(hideLoading());
            handleDataError(data);
        })
        .catch(error => handleCatchError(error));
    }
}

//Get a user's recipes, non-authorized
const myRecipes = (username) => {
    return dispatch => {
        fetch(`/recipes/user/${username}`, {
            method: 'GET'
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            dispatch(myRecipesAction(data));
            dispatch(hideLoading());
            handleDataError(data);
        })
        .catch(error => handleCatchError(error));
    }
}

//Get a recipe by id, non-authorized
const getRecipe = (recipe_id) => {
    return dispatch => {
        fetch(`/recipes/${recipe_id}`, {
            method: 'GET'
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            dispatch(viewRecipeAction(data));
            dispatch(hideLoading());
            handleDataError(data);
        })
        .catch(error => handleCatchError(error));
    }
}

//Update a recipe
const updateRecipe = (config) => {
    const { title, cookTime, ingredients, instructions, token, recipe_id } = config;
    //ingredients is an array containing amount{}, measurement{}, item{}

    const updatedInfo = { title, cookTime, ingredients, instructions }

    return dispatch => {
        fetch(`/recipes/${recipe_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            if (data._id) {
                dispatch(submitRecipeAction(data));
            } else if (data.errors) {
                dispatch(serverErrorAction(handleDataError(data)));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Delete a recipe
const deleteRecipe = (config) => {
    const { recipe_id, token } = config;
    
    return dispatch => {
        fetch(`/recipes/${recipe_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            handleResponse(res);
            if (res.ok) {
                dispatch(deleteRecipeAction(recipe_id));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Upload pictures
const uploadPictures = (data) => {
    const { pictureFiles, recipe_id, token } = data;
    const pictures = new FormData();

    for (let i = 0; i < pictureFiles.length; i++) {
        pictures.append('pictures', pictureFiles[i]);
    }

    fetch(`/recipes/${recipe_id}/pictures`, {
        method: 'POST',
        headers: { 'Authorization': token },
        body: pictures
    })
    .then(res => handleResponseNoJSON(res))
    .then(error => handleCatchError(error));
}

//Delete pictures for a recipe
const deletePictures = (config) => {
    const { recipe_id, token, username, pic_id } = config

    return dispatch => {
        fetch(`/recipes/${recipe_id}/pictures?image=${pic_id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        })
        .then(res => {
            handleResponseNoJSON(res);
            if (res.ok) {
                dispatch(myRecipes(username));
            }
        })
        .catch(error => handleCatchError(error));
    }
}


export { recipeServerAPI as default }