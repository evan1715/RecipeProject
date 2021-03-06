const userForm = document.querySelector('form');
// const submitLogin = document.querySelector('input').value;
// const username = document.querySelector('#username');
// const email = document.querySelector('#email');
// const password = document.querySelector('#password');
// const name = document.querySelector('#name');

userForm.addEventListener('submit', (event) => {
    //Could make a for look to gather nextElementSibling.value for submitLogin's input
    // const submitLogin = document.querySelector('input');
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const name = document.querySelector('#name').value;

    //Prevent the browser from refreshing to let the function run.
    event.preventDefault();

    // console.log(submitLogin);
    console.log(username, email, password, name);

    //GET
    // fetch('localhost:3001/user').then((response) => response.json()).then((json) => {
    //     json({
            
    //     })
    // });

    //POST
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
        return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error.message));
});