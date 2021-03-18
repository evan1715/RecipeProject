import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux'
import useServerAPI from '../../hooks/useServerAPI.js';
// import { placeholder } from '../../actions/account.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');


const CreateAccountModal = (props) => {
    // const [token, dispatch] = useReducer(accountReducer, []);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // const [error, setError] = useState(undefined);

    const dispatch = useDispatch()

    const createAccount = (e) => {
        e.preventDefault();
        const config = { username, email, password, name }
        dispatch(useServerAPI('/user', 'POST', config));
        // dispatch(placeholder('/user', 'POST', config));
    }
    
    return (
        <Modal
            isOpen={ !!props.openModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Create Account"
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h1 className="title">Create Account</h1>
            {/* <form onSubmit={ createAccount }> */}
            {/* Changed this to a submit button outside of the form */}
            <form>
                <input className="modal__form--input" value={ username } placeholder="username" onChange={ (e) => setUsername(e.target.value) } />
                <input className="modal__form--input" value={ email } placeholder="example@example.com" onChange={ (e) => setEmail(e.target.value) } />
                <input className="modal__form--input" value={ password } placeholder="password" onChange={ (e) => setPassword(e.target.value) } />
                <input className="modal__form--input" value={ name } placeholder="name" onChange={ (e) => setName(e.target.value) } />
                {/* <button className="createAccountModal__button">Submit</button> */}
            </form>
            <button className="button" onClick={ props.handleCloseModal }>Close</button>
            <button className="button" onClick={ createAccount }>Submit</button>
        </Modal>
    )
}

export { CreateAccountModal as default }