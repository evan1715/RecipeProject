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
    updateUserAction,
    getIconAction,
    deleteUserIconAction,
    serverErrorAction 
} from '../actions/account.js';

const useServerAPI = (type, config) => {
    switch (type) {
        case 'createAccount':
            return createAccount(config);
        case 'login':
            return login(config);
        case 'logout':
            return logout(config);
        case 'logoutAll':
            return logoutAll(config);
        case 'getUser':
            return getUser(config);
        case 'updateUser':
            return updateUser(config);
        case 'deleteUser':
            return deleteUser(config);
        case 'uploadIcon':
            return uploadIcon(config);
        case 'getIcon':
            return getIcon(config);
        case 'deleteIcon':
            return deleteIcon(config);
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

const handleCatchError = (error) => {
    console.log("Response error message: ", error.message);
}


//Contact the server to create an account and dispatch what the server responds with.
const createAccount = (config) => {
    //Deconstruct the incoming config
    const { username, email, password, name } = config;

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
        .catch(error => handleCatchError(error));
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
        .catch(error => handleCatchError(error));
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
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Logout of all locations.
const logoutAll = (token) => {
    return dispatch => {
        fetch('user/logoutAll', {
            method: 'POST',
            headers: { 'Authorization': token }
        })
        .then(res => {
            handleResponse(res);
            if (res.ok) {
                dispatch(logoutAction(token));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

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
        .catch(error => handleCatchError(error));
    }
}

//Update a user.
const updateUser = (config) => {
    //Server will only accept changes to username, email, password, and name.
    const { token, username, email, password, name } = config;

    return dispatch => {
        fetch('/user/profile', {
            method: 'PATCH',
            headers: { 'Authorization': token },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                name: name
            })
        })
        .then(res => handleResponse(res))
        .then(data => {
            console.log("Server data sent back: ", data);
            if (data.username) {
                dispatch(updateUserAction(data, token));
            } else if (data.name === 'MongoError' || data.errors) {
                dispatch(serverErrorAction(handleMongoError(data)));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Delete a user.
const deleteUser = (token) => {
    return dispatch => {
        fetch('/user/profile', {
            method: 'DELETE',
            headers: { 'Authorization': token }
        })
        .then(res => {
            handleResponse(res);
            if (res.ok) {
                dispatch(logoutAction(token));
            }
        })
        .catch(error => handleCatchError(error));
    }
}

//Upload a user's icon.
const uploadIcon = (data) => {
    const { iconFile, token } = data;
    const icon = new FormData();

    icon.append('icon', iconFile);

    return dispatch => {
        fetch('/user/profile/icon', {
            method: 'POST',
            headers: { 'Authorization': token },
            body: icon
        })
        .then(res => handleResponse(res))
        .catch(error => handleCatchError(error));
    }
}

//Get a user's icon.
const getIcon = (id) => {
    return dispatch => {
        fetch(`/user/${id}/icon`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => dispatch(getIconAction(data)))
        .catch(error => handleCatchError(error));
    }
}

const deleteIcon = (token) => {
    return dispatch => {
        fetch('/user/profile/icon', {
            method: 'DELETE',
            headers: { 'Authorization': token }
        })
        .then(res => {
            handleResponse(res);
            if (res.ok) {
                dispatch(deleteUserIconAction());
            }
        })
        .catch(error => handleCatchError(error));
    }
}


export { useServerAPI as default }