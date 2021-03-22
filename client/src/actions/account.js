//LOG_IN
const loginAction = (user, token) => {
    if (token) {
        return {
            type: 'LOGIN',
            user: {
                user: user,
                token: token
            }
        }
    }

    if (user.token) {
        localStorage.setItem('token', user.token);

        return {
            type: 'LOGIN',
            user: {
                user: user.user,
                token: user.token
            }
        }
    }
};

//LOG_OUT
const logoutAction = ({ id }) => ({
    type: 'LOGOUT',
    id: id
});

//LOG_OUT_ALL

//GET_USER //would this just be a hook instead?
const getUserAction = (profile) => ({
    type: 'GET_USER',
    user: profile
})

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
    loginAction,
    logoutAction,
    getUserAction,
    deleteAccountAction,
    serverErrorAction
}