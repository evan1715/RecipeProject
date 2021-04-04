import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useServerAPI from '../../hooks/useServerAPI.js';
import { UploadUserIconModal, ChangeUserInfoModal, LogoutAllModal, DeleteAccountModal } from './AccountModals.js';

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token, authenticated: isAuth, icon } = useSelector(state => state.accountReducer);
    const [openUploadUserIconModal, setOpenUploadUserIconModal] = useState(false);
    const [openChangeUserInfoModal, setOpenChangeUserInfoModal] = useState(false);
    const [openLogoutAllModal, setOpenLogoutAllModal] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
    //view my recipes
    //submit a new recipe
    //edit/update profile such as username, email, password, name

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
                    <button className="button" onClick={ () => setOpenChangeUserInfoModal(true) }>
                        Change username, email, password, or name
                    </button>
                    <ChangeUserInfoModal
                        openChangeUserInfoModal={ openChangeUserInfoModal }
                        handleCloseModal={ () => setOpenChangeUserInfoModal(false) }
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