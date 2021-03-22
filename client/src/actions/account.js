//~~~~~~~~working, sort of, but i don't think this is it. working on it~~~~~

//CREATE_ACCOUNT
const createAccountAction = ({ user, token }) => {
    const { _id, username, email, name } = user;
    // console.log(user, token)
    return {
        type: 'LOGIN',
        user: {
            user: {
                _id: _id,
                username: username,
                email: email,
                name: name
            },
            token: token
        }
    }
};


//LOG_IN
const loginAction = ({ user, token }) => ({
    type: 'LOGIN',
    user: {
        user: user,
        token: token
    }
});


// const loadInAction = () => (dispatch, getState) => {
//     //loading user
//     dispatch({ type: 'USER_LOADING' });

//     //get token from local storage
//     const token = getState().auth.token;

//     fetch('/user/login', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: email,
//             password: password
//         })
//     })
//     .then(res => {
//         if (res.status === 200) {
//             console.log("Logged in.");
//         }
//         return res.json();
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));
// }

//LOG_OUT
const logoutAction = ({ id }) => ({
    type: 'LOGOUT',
    id: id
});

//LOG_OUT_ALL

//GET_USER //would this just be a hook instead?

//UPDATE_USER

//DELETE_ACCOUNT
const deleteAccountAction = ({ id }) => ({
    type: 'DELETE_ACCOUNT',
    id: id
});

//UPLOAD_USER_ICON

//GET_USER_ICON

//DELETE_USER_ICON

//SERVER_ERROR
const serverErrorAction = (data) => {
    console.log("serverErrorAction fired:", data)
    return {
        type: 'SERVER_ERROR',
        error: data
    }
}




export {
    createAccountAction,
    loginAction,
    logoutAction,
    deleteAccountAction,
    serverErrorAction
}