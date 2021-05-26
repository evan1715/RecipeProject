import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import { clearErrorAction } from '../../actions/serverError.js';
import userServerAPI from '../../database/userServerAPI.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');

const CreateAccountModal = (props) => {
    const dispatch = useDispatch();
    const serverError = useSelector(state => state.serverErrorReducer);
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [name, setName] = useState('');

    const createAccount = () => {
        const config = { username, email, password, name }

        if (password !== passwordVerify) {
            return setResponse("Passwords do not match.");
        }
        
        dispatch(userServerAPI('createAccount', config));
    }

    const handleClearError = () => {
        if (serverError.error != null) {
            dispatch(clearErrorAction());
        }
    }

    useEffect(() => {        
        if (serverError.error) {
            setResponse(serverError.error);
        }
    }, [serverError]);
    
    return (
        <Modal
            isOpen={ !!props.openCreateAccountModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Empty response on open
            onAfterClose={ () => {
                //Reset password input
                setPassword('');
                setPasswordVerify('');
                //If modal gets closed, reset any response
                setResponse('');
                handleClearError();
                //putting this here because modal will pop up if user immediately signs out without changing the page
                props.handleCloseModal();
            }}
            contentLabel="Create Account"
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className="title">Create Account</h2>
            <form>
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setUsername(e.target.value) } placeholder="username" title="username" type="text" value={ username } />
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setEmail(e.target.value) } placeholder="example@example.com" title="email" type="email" value={ email } />
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setPassword(e.target.value) } placeholder="password" title="password" type="password" />
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setPasswordVerify(e.target.value) } placeholder="verify password" title="verify password" type="password" />
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setName(e.target.value) } placeholder="name" title="your name" type="text" value={ name } />
            </form>
            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal } title="Close">Close</button>
            <button className="button" onClick={ createAccount } title="Submit">Submit</button>
        </Modal>
    )
}

export { CreateAccountModal as default }