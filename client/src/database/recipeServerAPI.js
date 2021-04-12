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

import { serverErrorAction } from '../actions/account.js';
import {
    submitRecipeAction,
    allRecipesAction,
    myRecipesAction,
    getRecipeAction,
    updateRecipeAction,
    deleteRecipeAction,
    // uploadPicturesAction,
    getRecipePicturesAction,
    deletePicturesAction
} from '../actions/userRecipes.js';

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
        case 'getRecipePictures': //get
            return getRecipePictures(config); //id
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

//Handle errors sent back in data.
const handleDataError = (data) => {
    var message;
    
    console.log("Server data sent back: ", data);

    if (data.name === 'MongoError') {
        message = data;
    } else if (data.error) {
        message = data.error;
    } else if (data.errors) {
        message = data.errors
    }

    if (message) {
        return dispatch => dispatch(serverErrorAction(message));
    }
}

//Handle errors caught by catch.
const handleCatchError = (error) => {
    console.log("Response error message: ", error.message);
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
            dispatch(submitRecipeAction(data));
            handleDataError(data);
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
            dispatch(allRecipesAction(data));
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
            dispatch(myRecipesAction(data));
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
            dispatch(getRecipeAction);
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
            dispatch(updateRecipeAction(data));
            handleDataError(data);
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

    pictures.append('pictures', pictureFiles);

    fetch(`/recipes/${recipe_id}/pictures`, {
        method: 'POST',
        headers: { 'Authorization': token },
        body: pictures
    })
    .then(res => {
        handleResponse(res);
        //If ok, send it to getRecipePictures to dispatch pictures back
        if (res.ok) {
            getRecipePictures(recipe_id);
        }
    })
    .then(error => handleCatchError(error));
}

//Get the pictures for a recipe, non-auth
const getRecipePictures = (recipe_id) => {
    return dispatch => {
        fetch(`/recipes/${recipe_id}/pictures`, {
            method: 'GET'
        })
        .then(res => res.blob())
        .then(image => {
            //Check if there's a file at all.
            if (image.size > 0) {
                const url = URL.createObjectURL(image);
                dispatch(getRecipePicturesAction(url));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Delete pictures for a recipe
const deletePictures = (config) => {
    const { recipe_id, token } = config

    return dispatch => {
        fetch(`/recipes/${recipe_id}/pictures`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        })
        .then(res => {
            handleResponse(res);
            if (res.ok) {
                dispatch(deletePicturesAction());
            }
        })
        .catch(error => handleCatchError(error));
    }
}


export { recipeServerAPI as default }