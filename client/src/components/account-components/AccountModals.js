import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import useServerAPI from '../../hooks/useServerAPI.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');



const UploadUserIconModal = props => {

    return (
        <Modal
            isOpen={ props.openModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Upload user icon" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >

        </Modal>
    )
}

const ChangeUserInfoModal = props => {

    return (
        <Modal
            isOpen={ props.openModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Change account information" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >

        </Modal>
    )
}

const LogoutAllModal = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { token, authenticated: isAuth } = useSelector(state => state.accountReducer);

    return (
        <Modal
            isOpen={ props.openLogoutAllModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Logout of all locations" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className='title'>Are you sure you want to logout of all locations?</h2>
            <button className='button' onClick={ isAuth && (() => (history.push('/'), dispatch(useServerAPI('logoutAll', token)))) }>
                Yes
            </button>
            <button className='button' onClick={ props.handleCloseModal }>
                No
            </button>
        </Modal>
    )
}

const DeleteAccountModal = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [username, setUsername] = useState('');

    const handleDeleteUser = () => {
        if (isAuth && username === user.username) {
            history.push('/');
            dispatch(useServerAPI('deleteUser', token));
        }
    }

    return (
        <Modal
            isOpen={ props.openDeleteAccountModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Delete my account" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className='title'>Are you sure you want to delete your account?</h2>
            <p>Type your username to delete your account.</p>
            <form>
                <input className='modal__form--input' value={ username } onChange={ (e) => setUsername(e.target.value) } />
            </form>
            <button className='button' onClick={ props.handleCloseModal }>Cancel</button>
            <button className='button' onClick={ handleDeleteUser }>Delete</button>
        </Modal>
    )
}

export {
    UploadUserIconModal,
    ChangeUserInfoModal,
    LogoutAllModal,
    DeleteAccountModal
}