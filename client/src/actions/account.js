// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();

//~~~~~~~~working, sort of, but i don't think this is it. working on it~~~~~

//CREATE_ACCOUNT
// const createAccountAction = ({ username, email, password, name }) => {
const createAccountAction = (username, email, password, name) => {

    fetch('/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            name: name
        })
    })
    .then(res => {
        if (res.status === 201) {
            dispatch({
                type: 'LOGIN',
                user: {
                    user: email,
                    token: res.data.token
                }
            })
            console.log("Logged in.");
        }
        console.log(res);
        return res.json();
    })
    .then(data => {
        // dispatch({ 
        //     type: 'LOGIN',
        //     user: {
        //         user: email,
        //         token: data.token
        //     }
        // })
        console.log(data.token);
        console.log(data);
    })
    .catch(error => console.log(error.message));


    // return {
    //     type: 'CREATE_ACCOUNT',
    //     user: {
    //         username: username,
    //         password: password,
    //     }
    // }

};


//LOG_IN
const logInAction = ({ email, password }) => ({
    type: 'LOG_IN',
    user: {
        email: email,
        password: password
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
const logOutAction = ({ id }) => ({
    type: 'LOG_OUT',
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
    logInAction
}