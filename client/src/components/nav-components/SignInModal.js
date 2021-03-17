import React, { useState } from 'react';
import Modal from 'react-modal';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');

const SignInModal = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
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
            <h1 className="title">Sign In</h1>
            <form>
                <input className="modal__form--input" value={ email } placeholder="email" onChange={ (e) => setEmail(e.target.value) } />
                <input className="modal__form--input" value={ password } placeholder="password" onChange={ (e) => setPassword(e.target.value) } />
            </form>
            <button className="button" onClick={ props.handleCloseModal }>Close</button>
            <button className="button" onClick={ signIn }>Submit</button>
        </Modal>
    )
}

export { SignInModal as default }