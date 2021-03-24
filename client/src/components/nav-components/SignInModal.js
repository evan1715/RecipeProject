import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import useServerAPI from '../../hooks/useServerAPI.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');

const SignInModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const [response, setResponse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        const config = { email, password }
        dispatch(useServerAPI('signIn', config));
    }

    useEffect(() => {
        if (serverResponse.error === "Incorrect email and password combination.") {
            setResponse(serverResponse.error);
        }
        if (serverResponse.token) {
            setResponse('');
            props.handleCloseModal();
        }

    }, [serverResponse]);
    
    useEffect(() => {
        if (!props.openModal) {
            setResponse('');
        }
    }, [props.openModal])

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
            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal }>Close</button>
            <button className="button" onClick={() => { signIn() }}>Submit</button>
        </Modal> //; props.handleCloseModal();
    )
}

export { SignInModal as default }