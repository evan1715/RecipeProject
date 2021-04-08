import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import useServerAPI from '../../hooks/useServerAPI.js';
import { serverErrorAction } from '../../actions/account.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');

const CreateAccountModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const createAccount = () => {
        const config = { username, email, password, name }
        // e.preventDefault(); //is this even necessary? -- no, doesn't seem like it.
        dispatch(useServerAPI('createAccount', config));
    }

    const handleClearError = () => {
        if (serverResponse.error != null) {
            dispatch(serverErrorAction(null))
        }
    }

    useEffect(() => {        
        if (serverResponse.error) {
            setResponse(serverResponse.error);
        }
        if (serverResponse.token) {
            setResponse("Account created!");
        }
    }, [serverResponse]);
    
    return (
        <Modal
            isOpen={ !!props.openCreateAccountModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Empty response on open
            onAfterClose={ () => (setResponse(''), handleClearError()) } //If modal gets closed, reset any response
            contentLabel="Create Account"
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className="title">Create Account</h2>
            {/* <form onSubmit={ createAccount }> */}
            {/* Changed this to a submit button outside of the form */}
            <form>
                <input className="modal__form--input" value={ username } placeholder="username" onChange={ (e) => setUsername(e.target.value) } />
                <input className="modal__form--input" value={ email } placeholder="example@example.com" onChange={ (e) => setEmail(e.target.value) } />
                <input className="modal__form--input" value={ password } placeholder="password" onChange={ (e) => setPassword(e.target.value) } />
                <input className="modal__form--input" value={ name } placeholder="name" onChange={ (e) => setName(e.target.value) } />
                {/* <button className="createAccountModal__button">Submit</button> */}
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