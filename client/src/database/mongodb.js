/*
-component: submit will onclick, dispatch action that updates the state, the action will take an argument that will take user info, then pass it to reducer, then pass it to database

//file not currently in use by other files. figuring it out~~~~~~~
*/

const createAccount = (e) => {
    e.preventDefault();
    
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
            console.log("Logged in.");
        }
        console.log(res);
        return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error.message));
}



const signIn = (e, email, password) => {
    e.preventDefault();

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



export { createAccount, signIn }