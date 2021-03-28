import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import useServerAPI from '../../hooks/useServerAPI.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');



const UploadUserIconModal = props => {
    const dispatch = useDispatch();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [icon, setIcon] = useState();
    const [iconFile, setIconFile] = useState();
    
    // const callIcon = () => {
    //     const currentIcon = useServerAPI('getIcon', user._id);
    //     return currentIcon;
    // }

    const uploadIcon = () => {
        const config = { iconFile, token }
        dispatch(useServerAPI('uploadIcon', config));
    }

    return (
        <Modal
            isOpen={ props.openUploadUserIconModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Upload user icon" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <form encType='multipart/form-data'>
                { icon && <p>{ icon }</p> }
                <input type='file' id='image-upload' onChange={ (e) => setIconFile(e.target.files[0]) } />
            </form>
            <button className='button' onClick={ props.handleCloseModal }>Cancel</button>
            <button className='button' onClick={ isAuth && (() => dispatch(useServerAPI('deleteIcon', token))) }>Delete icon</button>
            <button className='button' onClick={ isAuth && uploadIcon }>Upload</button>
        </Modal>
    )
}

const ChangeUserInfoModal = props => {

    return (
        <Modal
            isOpen={ props.openChangeUserInfoModal }
            onRequestClose={ props.handleCloseModal }
            contentLabel="Change account information" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <p>placeholder</p>
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