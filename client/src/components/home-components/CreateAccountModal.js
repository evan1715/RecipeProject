import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import useServerAPI from '../../hooks/useServerAPI.js';
import { clearErrorAction } from '../../actions/serverError.js';

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
        
        dispatch(useServerAPI('createAccount', config));
    }

    const handleClearError = () => {
        if (serverError.error != null) {
            dispatch(clearErrorAction())
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
                <input className="modal__form--input" value={ username } placeholder="username" onChange={ (e) => setUsername(e.target.value) } />
                <input className="modal__form--input" type="email" value={ email } placeholder="example@example.com" onChange={ (e) => setEmail(e.target.value) } />
                <input className="modal__form--input" type="password" placeholder="password" onChange={ (e) => setPassword(e.target.value) } />
                <input className="modal__form--input" type="password" placeholder="verify password" onChange={ (e) => setPasswordVerify(e.target.value) } />
                <input className="modal__form--input" value={ name } placeholder="name" onChange={ (e) => setName(e.target.value) } />
            </form>
            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal }>Close</button>
            <button className="button" onClick={ createAccount }>Submit</button>
        </Modal>
    )
}

export { CreateAccountModal as default }