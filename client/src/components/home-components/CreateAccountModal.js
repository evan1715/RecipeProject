import React, { useState } from 'react';
import Modal from 'react-modal';


//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');

const CreateAccountModal = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // const [error, setError] = useState(undefined);

    const createAccount = (e) => {
        e.preventDefault();

        // const error = props.createAccount(e.target.elements.value.trim());
        // setError(() => ({ error: error }));
        
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
            console.log(res);
            return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error.message));
    }
    
    return (
        <Modal
            isOpen={ !!props.openModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel=""
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h3 className="createAccountModal__title">Create Account</h3>
            {/* <form onSubmit={ createAccount }> */}
            {/* Changed this to a submit button outside of the form */}
            <form>
                <input className="createAccountModal__form-input" value={ username } placeholder="username" onChange={ (e) => setUsername(e.target.value) } />
                <input className="createAccountModal__form-input" value={ email } placeholder="example@example.com" onChange={ (e) => setEmail(e.target.value) } />
                <input className="createAccountModal__form-input" value={ password } placeholder="password" onChange={ (e) => setPassword(e.target.value) } />
                <input className="createAccountModal__form-input" value={ name } placeholder="name" onChange={ (e) => setName(e.target.value) } />
                {/* <button className="createAccountModal__button">Submit</button> */}
            </form>
            <button className="button" onClick={ createAccount }>Submit</button>
            <button className="button" onClick={ props.handleCloseModal }>Close</button>
        </Modal>
    )
}

export { CreateAccountModal as default }