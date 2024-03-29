import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { clearErrorAction } from '../../actions/serverError.js';
import userServerAPI from '../../database/userServerAPI.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');

const SignInModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const serverError = useSelector(state => state.serverErrorReducer);
    const [response, setResponse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        const config = { email, password }
        dispatch(userServerAPI('login', config));
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
        if (serverResponse.token) {
            setResponse('');
            props.handleCloseModal();
        }

    }, [serverResponse, serverError]);

    return (
        <Modal
            isOpen={ props.openSigninModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Empty response on open
            onAfterClose={ () => (setResponse(''), handleClearError(), setPassword('')) } //If modal gets closed, reset any response
            contentLabel="Sign in" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h1 className="title">Sign In</h1>
            <form onKeyPress={ (e) => (e.key === 'Enter') && signIn() }>
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setEmail(e.target.value) } placeholder="email" title="your email" type="email" value={ email } />
                <input className="modal__form--input" maxLength="32" onChange={ (e) => setPassword(e.target.value) } placeholder="password" title="your password" type="password" />
            </form>
            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal } title="Close">Close</button>
            <button className="button" onClick={ signIn } title="Submit">Submit</button>
        </Modal>
    )
}

export { SignInModal as default }