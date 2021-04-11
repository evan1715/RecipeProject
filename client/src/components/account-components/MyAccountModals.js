import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import useServerAPI from '../../hooks/useServerAPI.js';
import { serverErrorAction } from '../../actions/account.js';

//Modal requires us to pass in the main <div> to Modal.setAppElement. In this project's case, it's #root since that's what React is in the index.html.
Modal.setAppElement('#root');


//Upload an icon for the user
const UploadUserIconModal = (props) => {
    const dispatch = useDispatch();
    const { user, token, authenticated: isAuth, icon } = useSelector(state => state.accountReducer);
    const [userIcon, setUserIcon] = useState();
    const [iconFile, setIconFile] = useState();
    const [response, setResponse] = useState();
    const user_id = user._id;
    // const htmlImage = `data:image/jpg;base64,${user.icon}`;
    // const imageURL = `/user/${user._id}/icon`;

    const uploadIcon = () => {
        //If no icon file is set, no need to dispatch
        if (!iconFile) {
            return;
        }

        console.log("File type attempted to upload:", iconFile.type);
    
        //Check the file type
        if (!iconFile.type.match(/(png|jpg|jpeg|bmp|gif)/)) {
            return setResponse("Not a supported file type.");
        }
    
        //If file type is good, pass it to the app and the server. The server will also check the filetype.
        const config = { iconFile, token, user_id }
        
        useServerAPI('uploadIcon', config);
        setResponse("Uploaded!");
        //Let's reload the page after it uploaded.
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const deleteIcon = () => {
        if (isAuth && icon) {
            dispatch(useServerAPI('deleteIcon', token));
        }
    }

    useEffect(() => {
        if (userIcon) {
            console.log("Current userIcon link:", userIcon);
            URL.revokeObjectURL(userIcon);
            console.log("New userIcon link:", icon);
        }
        setUserIcon(icon);
    }, [icon]);

    return (
        <Modal
            isOpen={ props.openUploadUserIconModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => setResponse('') } //If modal gets closed, reset any response
            contentLabel="Upload user icon" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <form encType='multipart/form-data'>
                <img src={ userIcon }></img>
                <input type="file" id="image-upload" onChange={ (e) => setIconFile(e.target.files[0]) } />
            </form>
            { response && <p>{ response }</p> }
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ deleteIcon }>Delete icon</button>
            <button className="button" onClick={ isAuth && uploadIcon }>Upload</button>
        </Modal>
    )
}

//Change username
const ChangeUsernameModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const { user, token, authenticated: isAuth } = serverResponse;
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');

    const updateUser = () => {
        const config = { token, username }

        //If they haven't entered a username or if it isn't new, don't dispatch.
        if (username && username !== user.username) {
            dispatch(useServerAPI('updateUser', config));
        }
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
    }, [serverResponse.error]);

    useEffect(() => {
        //If the userinfo changes in redux, that means it worked. Tell the user it updated.
        setResponse("Updated!");
        //Close the modal after a little, but don't close it when the page loads. Only when it's opened.
        if (props.openChangeUsernameModal) {
            setTimeout(() => {
                props.handleCloseModal();
            }, 2000);
        }
    }, [user.username]);

    return (
        <Modal
            isOpen={ props.openChangeUsernameModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => { 
                //If modal gets closed, clear user input from state
                setUsername('');
                //If modal gets closed, reset any response
                setResponse('');
                handleClearError();
            }}
            contentLabel="Change username" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className="title">Update username</h2>
            <p>Current username: { user.username }</p>

            <input 
                className="modal__form--input" 
                // value={ username } 
                placeholder="username" 
                onChange={ (e) => setUsername(e.target.value) } 
            />

            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ isAuth && updateUser }>Update</button>
        </Modal>
    )
}

//Change email
const ChangeEmailModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const { user, token, authenticated: isAuth } = serverResponse;
    const [response, setResponse] = useState('');
    const [email, setEmail] = useState('');

    const updateUser = () => {
        const config = { token, email }

        //if they haven't entered an email or it isn't new, don't dispatch.
        if (email && email !== user.email) {
            dispatch(useServerAPI('updateUser', config));
        }
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
    }, [serverResponse.error]);

    useEffect(() => {
        //If the userinfo changes in redux, that means it worked. Tell the user it updated.
        setResponse("Updated!");
        //Close the modal after a little, but don't close it when the page loads. Only when it's opened.
        if (props.openChangeEmailModal) {
            setTimeout(() => {
                props.handleCloseModal();
            }, 2000);
        }
    }, [user.email]);

    return (
        <Modal
            isOpen={ props.openChangeEmailModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => { 
                //If modal gets closed, clear user input from state
                setEmail('');
                //If modal gets closed, reset any response
                setResponse(''); 
                handleClearError();
            }}
            contentLabel="Change email" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className="title">Update email</h2>
            <p>Current email: { user.email }</p>

            <input 
                className="modal__form--input" 
                // value={ email } 
                placeholder="email" 
                onChange={ (e) => setEmail(e.target.value) } 
            />

            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ isAuth && updateUser }>Update</button>
        </Modal>
    )
}

//Change password
const ChangePasswordModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const { user, token, authenticated: isAuth } = serverResponse;
    const [response, setResponse] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordVerified, setNewPasswordVerified] = useState('');
    // const [previousPassBlur, setPreviousPassBlur] = useState([]);

    const updateUser = () => {
        const email = user.email;
        const password = newPasswordVerified;
        const config = { token, email, previousPassword, password }
        
        if (newPassword !== newPasswordVerified) {
            return setResponse("New passwords do not match.");
        }

        //If they haven't given all fields, don't dispatch.
        if (previousPassword && newPassword && newPasswordVerified) {
            dispatch(useServerAPI('updateUser', config));
        }
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
    }, [serverResponse.error]);

    useEffect(() => {
        //If the userinfo changes in redux, that means it worked. Tell the user it updated.
        setResponse("Updated!");
        //Close the modal after a little, but don't close it when the page loads. Only when it's opened.
        if (props.openChangePasswordModal) {
            setTimeout(() => {
                props.handleCloseModal();
            }, 2000);
            // setTimeout(() => props.handleCloseModal(), 2000);
        }
    }, [user]);

    // const handlePrevPassBlur = () => {
    //     let str = '*';
    //     for (var i = 0; i < previousPassword.length; i++) {
    //         str += '*'
    //     }
    //     // setTimeout(() => setPreviousPassBlur(str), 1000);
    //     setPreviousPassBlur(str);
    // }

    return (
        <Modal
            isOpen={ props.openChangePasswordModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => { 
                //temp
                // setPreviousPassBlur('');
                //If modal gets closed, clear user input from state
                setPreviousPassword('');
                setNewPassword('');
                setNewPasswordVerified('');
                //If modal gets closed, reset any response
                setResponse(''); 
                handleClearError(); 
            }}
            contentLabel="Change password" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className="title">Update password</h2>
            <form /*onSubmit={ (e) => e.preventDefault() }*/>
                <input 
                    className="modal__form--input" 
                    id="prevPass"
                    // value={ previousPassword } 
                    // value={ previousPassBlur }
                    title="current password"
                    placeholder="current password"
                    required
                    type="password"
                    onChange={ (e) => {
                        setPreviousPassword(e.target.value);
                        // handlePrevPassBlur();
                    }}
                />
                <input type="checkbox" title="toggle visibility" onClick={ () => {
                    var toggle = document.getElementById('prevPass');
                    toggle.type === "password" ? toggle.type = "text" : toggle.type = "password"
                }} />
                <input
                    className="modal__form--input"
                    id="newPass"
                    // value={ newPassword }
                    title="new password"
                    placeholder="new password"
                    required
                    type="password"
                    onChange={ (e) => setNewPassword(e.target.value) }
                />
                <input type="checkbox" title="toggle visibility" onClick={ () => {
                    var toggle = document.getElementById('newPass');
                    toggle.type === "password" ? toggle.type = "text" : toggle.type = "password"
                }} />
                <input 
                    className="modal__form--input" 
                    id="verifyPass"
                    // value={ newPasswordVerified } 
                    title="verify new password"
                    placeholder="verify new password"
                    required
                    type="password"
                    onChange={ (e) => setNewPasswordVerified(e.target.value) } 
                />
                <input type="checkbox" title="toggle visibility" onClick={ () => {
                    var toggle = document.getElementById('verifyPass');
                    toggle.type === "password" ? toggle.type = "text" : toggle.type = "password"
                }} />
            </form>
            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ isAuth && updateUser }>Update</button>
        </Modal>
    )
}

//Change name
const ChangeNameModal = (props) => {
    const dispatch = useDispatch();
    const serverResponse = useSelector(state => state.accountReducer);
    const { user, token, authenticated: isAuth } = serverResponse;
    const [response, setResponse] = useState('');
    const [name, setName] = useState('');

    const updateUser = () => {
        const config = { token, name }

        //If they haven't entered a name or it isn't new, don't dispatch
        if (name && name !== user.name) {
            dispatch(useServerAPI('updateUser', config));
        }
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
    }, [serverResponse.error]);

    useEffect(() => {
        //If the userinfo changes in redux, that means it worked. Tell the user it updated.
        setResponse("Updated!");
        //Close the modal after a little, but don't close it when the page loads. Only when it's opened.
        if (props.openChangeNameModal) {
            setTimeout(() => {
                props.handleCloseModal();
            }, 2000);
        }
    }, [user.name]);

    return (
        <Modal
            isOpen={ props.openChangeNameModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => { 
                //If modal gets closed, clear user input from state
                setName('');
                //If modal gets closed, reset any response
                setResponse(''); 
                handleClearError(); 
            }}
            contentLabel="Change name" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            <h2 className="title">Update name</h2>
            <p>Current name: { user.name }</p>

            <input 
                className="modal__form--input" 
                // value={ name } 
                placeholder="name" 
                onChange={ (e) => setName(e.target.value) } 
            />

            { /* If there's a response, then show the response to the user here. */
                response && <p>{ response }</p> 
            } 
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ isAuth && updateUser }>Update</button>
        </Modal>
    )
}

//Log out of all locations
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
            <h2 className="title">Are you sure you want to logout of all locations?</h2>
            <button 
                className="button" 
                //If they're authorized, log out all, and push them to the homepage.
                onClick={ isAuth && (() => (history.push('/'), dispatch(useServerAPI('logoutAll', token)))) }
            >
                Yes
            </button>
            <button className="button" onClick={ props.handleCloseModal }>
                No
            </button>
        </Modal>
    )
}

//Delete account
const DeleteAccountModal = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [username, setUsername] = useState('');

    const handleDeleteUser = () => {
        //Just double checking to make sure the data seems right.
        if (isAuth && username === user.username) {
            //Once they're deleted and logged out, push them to the homepage.
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
            <h2 className="title">Are you sure you want to delete your account?</h2>
            <p>Type your username to delete your account.</p>
            <input 
                className="modal__form--input" 
                // value={ username } 
                onChange={ (e) => setUsername(e.target.value) } 
            />
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ handleDeleteUser }>Delete</button>
        </Modal>
    )
}


export {
    UploadUserIconModal,
    ChangeUsernameModal,
    ChangeEmailModal,
    ChangePasswordModal,
    ChangeNameModal,
    LogoutAllModal,
    DeleteAccountModal
}