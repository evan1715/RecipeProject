/*  API POST options:
    Create an account & Log in with token.
    - /user
    Log in a user.
    - /user/login
    Log out a user.
    - /user/logout
    Upload a user's icon.
    - /user/profile/icon

    API GET options:
    View profile or get user.
    - /user/profile
    Get a user's icon.
    - /user/:id/icon

    API PATCH options:
    Update a user.
    - /user/profile

    API DELETE options:
    Delete a user.
    - /user/delete
    Delete icon.
    - /user/profile/icon
*/

import { 
    loginAction,
    logoutAction,
    serverErrorAction 
} from '../actions/account.js';



const useServerAPI = (type, config) => {
    if (type === 'createAccount') {
        return createAccount(config);
    }

    if (type === 'signIn') {
        return login(config);
    }

    if (type === 'logout') {
        return logout(config);
    }

    if (type === 'getUser') {
        return getUser(config);
    }
}

const handleResponse = (res) => {
    if (res.ok) { //if res.status = 200-299
        console.log(res.status, "Server URL success. Server response: ", res);
        // console.log(res.json());
    } else if (!res.ok) { //if res.status = 400-599
        console.log(res.status, "Server URL unsuccessful.");
        // console.log(res.json());
    }
    return res.json();
}

const handleMongoError = (data) => {
    var message;

    if (data.keyPattern) {
        if (data.keyPattern.username) {
            message = `The username \"${data.keyValue.username}\" is already taken!`;
        }

        if (data.keyPattern.email) {
            message = `The email \"${data.keyValue.email}\" is already being used!`;
        }
    } else if (data.errors) {
        if (data.errors.password) {
            message = "Password must be a minimum length of 8 characters.";
        }

        if (data.errors.email) {
            message = data.errors.email.message;
        }
    } else if (data.error === 'Unable to login.') {
        message = "Incorrect email and password combination."
    } else {
        message = "Unknown error."
    }

    return message;
}


//Contact the server to create an account and dispatch what the server responds with.
const createAccount = (config) => {
    //Deconstruct the incoming config
    const { username, email, password, name} = config;

    // fetch & post the information
    return dispatch => {
        fetch('/user', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, email, password, name })
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            if (data.token) {
                dispatch(loginAction(data));
            } else if (data.name === 'MongoError' || data.errors) {
                dispatch(serverErrorAction(handleMongoError(data)));
            }
        })
        .catch(error => console.log("Response error message: ", error.message))
    }
}


//Login
const login = (config) => {
    const { email, password } = config;

    return dispatch => {
        fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            if (data.token) {
                dispatch(loginAction(data));
            } else if (data.error) {
                dispatch(serverErrorAction(handleMongoError(data)));
            }
        })
        .catch(error => console.log("Response error message: ", error.message))
    }
}

//Logout of current location.
const logout = (token) => {
    return dispatch => {
        fetch('/user/logout', {
            method: 'POST',
            headers: { 'Authorization': token }
        })
        .then(res => {
            handleResponse(res);
            if (res.ok) {
                dispatch(logoutAction(token));
            } else {
                dispatch(serverErrorAction(res.status));
            }
        })
        .catch(error => console.log("Response error message: ", error.message))
    }
}
/*
//Logout of all locations.
const logoutAll = (id) => {
    const { _id } = id;

    return dispatch => {

    }
}
*/
//Get user profile/account.
const getUser = (token) => {
    return dispatch => {
        fetch('/user/profile', {
            method: 'GET',
            headers: { 'Authorization': token }
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            if (data.username) {
                dispatch(loginAction(data, token));
            } else if (data.name === 'MongoError' || data.errors) {
                dispatch(serverErrorAction(handleMongoError(data)));
            }
        })
        .catch(error => console.log("Response error message: ", error.message))
    }
}
/*
//Update a user.
const updateUser = (config) => {
    return dispatch => {

    }
}

//Delete a user.
const deleteUser = (id) => {
    return dispatch => {

    }
}

//Upload a user's icon.
const uploadIcon = (config) => {
    return dispatch => {

    }
}

//Get a user's icon.
const getIcon = (id) => {
    return dispatch => {

    }
}

const deleteIcon = (id) => {
    return dispatch => {

    }
}
*/

export { useServerAPI as default }