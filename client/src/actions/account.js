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

export function placeholder(url, method, config) {
    return dispatch => {
        const { username, email, password, name} = config;

        
        return fetch(url, {
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
                dispatch(createAccountAction(data));
                console.log(data);
            })
            .catch(error => {
                // throw new Error(error)
                console.log("Response error message: ", error);
            })
    }
}


//LOG_IN
const loginAction = ({ user, token }) => ({
    type: 'LOGIN',
    user: {
        user: user,
        token: token
    }
});


const loadInAction = () => (dispatch, getState) => {
    //loading user
    dispatch({ type: 'USER_LOADING' });

    //get token from local storage
    const token = getState().auth.token;

    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        if (res.status === 200) {
            console.log("Logged in.");
        }
        return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error.message));
}

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


export {
    createAccountAction,
    loginAction
}