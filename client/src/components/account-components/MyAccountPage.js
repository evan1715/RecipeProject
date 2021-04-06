import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useServerAPI from '../../hooks/useServerAPI.js';
import { 
    UploadUserIconModal, 
    ChangeUsernameModal,
    ChangeEmailModal,
    ChangePasswordModal,
    ChangeNameModal,
    LogoutAllModal, 
    DeleteAccountModal 
} from './AccountModals.js';

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token, authenticated: isAuth, icon } = useSelector(state => state.accountReducer);
    // const [openModal, setOpenModal] = useState(false);
    // const [response, setResponse] = useState('');
    const [openUploadUserIconModal, setOpenUploadUserIconModal] = useState(false);
    const [openChangeUsernameModal, setOpenChangeUsernameModal] = useState(false);
    const [openChangeEmailModal, setOpenChangeEmailModal] = useState(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [openChangeNameModal, setOpenChangeNameModal] = useState(false);
    const [openLogoutAllModal, setOpenLogoutAllModal] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
    //view my recipes
    //submit a new recipe
    //set new password by verifying old one and reconfirming the new one

    // const handleCloseModal = () => {
    //     if (openModal) {
    //         setOpenModal(false);
    //     } else if (!openModal) {
    //         setOpenModal(true);
    //     }
    // }

    useEffect(() => {
        dispatch(useServerAPI('getIcon', user._id));
    }, []);

    return (
        <div className="my-account-page__container">
            <div className="my-account-page__placeholder" />
            <div className="my-account-page__center">
    
                <h2>My Recipes</h2>
                    <button className="button" onClick={ () => history.push('/myrecipes') }>View or edit my recipes</button>
                    <button className="button" onClick={ () => history.push('/submitrecipe') }>Submit a new recipe</button>
                

                <h2>My Account</h2>
                <>
                    <button className="button" onClick={ () => setOpenUploadUserIconModal(true) }>
                        Upload or modify user icon
                    </button>
                    <UploadUserIconModal
                        openUploadUserIconModal={ openUploadUserIconModal }
                        handleCloseModal={ () => setOpenUploadUserIconModal(false) }
                    />
                </>

                <>
                    <button className="button" onClick={ () => setOpenChangeUsernameModal(true) }>
                        Change my username
                    </button>
                    <ChangeUsernameModal
                        openChangeUsernameModal={ openChangeUsernameModal }
                        handleCloseModal={ () => setOpenChangeUsernameModal(false) }
                    />
                </>

                <>
                    <button className="button" onClick={ () => setOpenChangeEmailModal(true) }>
                        Change my email
                    </button>
                    <ChangeEmailModal
                        openChangeEmailModal={ openChangeEmailModal }
                        handleCloseModal={ () => setOpenChangeEmailModal(false) }
                    />
                </>

                <>
                    <button className="button" onClick={ () => setOpenChangePasswordModal(true) }>
                        Set a new password
                    </button>
                    <ChangePasswordModal
                        openChangePasswordModal={ openChangePasswordModal }
                        handleCloseModal={ () => setOpenChangePasswordModal(false) }
                    />
                </>

                <>
                    <button className="button" onClick={ () => setOpenChangeNameModal(true) }>
                        Modify my name
                    </button>
                    <ChangeNameModal
                        openChangeNameModal={ openChangeNameModal }
                        handleCloseModal={ () => setOpenChangeNameModal(false) }
                    />
                </>

                <>
                    <button className="button" onClick={ () => setOpenLogoutAllModal(true) }>
                        Log out of all locations
                    </button>
                    <LogoutAllModal 
                        openLogoutAllModal={ openLogoutAllModal } 
                        handleCloseModal={ () => setOpenLogoutAllModal(false) } 
                    />
                </>

                <>
                    <button className="button" onClick={ () => setOpenDeleteAccountModal(true) }>
                        Delete my account
                    </button>
                    <DeleteAccountModal 
                        openDeleteAccountModal={ openDeleteAccountModal } 
                        handleCloseModal={ () => setOpenDeleteAccountModal(false) } 
                    />
                </>
            </div>
            <div className="my-account-page__icon">
                <img src={ icon } />
            </div>
        </div>
    )
}



export { MyAccountPage as default }