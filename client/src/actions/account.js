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
const logoutAction = (token) => ({
    type: 'LOGOUT',
    token: token
});

//GET_USER //would this just be a hook instead?
const getUserAction = (profile) => ({
    type: 'GET_USER',
    user: profile
});

//UPDATE_USER
const updateUserAction = (user, token) => ({
    type: 'UPDATE_USER',
    user: user,
    token: token
});

//GET_USER_ICON
const getIconAction = (icon) => ({
    type: 'GET_USER_ICON',
    icon: icon
});

//DELETE_USER_ICON
const deleteUserIconAction = (user) => ({
    type: 'DELETE_USER_ICON',
    user: user
});


export {
    loginAction,
    logoutAction,
    getUserAction,
    updateUserAction,
    getIconAction,
    deleteUserIconAction,
}