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
import { createAccountAction } from '../actions/account.js';

const useServerAPI = (url, method, config) => {
    //Deconstruct the incoming config
    const { username, email, password, name} = config;

    //fetch & post the information
    fetch(url, {
        method: method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, email, password, name })
    })
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            console.log("Server URL success.");
            console.log(res);
        } else if (res.status === 400 || res.status === 404 || res.status === 500) {
            console.log("Server URL unsuccessful.");
            console.log(res.json()); //figure out how to dispatch error back to redux to display what error mongodb gets.
        }
        return res.json();
    }).then(data => {
        createAccountAction(data);
        console.log(data);
    })
    .catch(error => 
        console.log("Response error message: ", error));

}

export { useServerAPI as default }