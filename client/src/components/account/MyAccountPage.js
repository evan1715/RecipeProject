import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MyRightColumn from './RightColumn.js';
import LeftColumn from './LeftColumn.js';
import { 
    UploadUserIconModal, 
    ChangeUsernameModal,
    ChangeEmailModal,
    ChangePasswordModal,
    ChangeNameModal,
    LogoutAllModal, 
    DeleteAccountModal 
} from './MyAccountModals.js';
import { clearSelectedRecipeAction } from '../../actions/selectedRecipe.js';

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const [openUploadUserIconModal, setOpenUploadUserIconModal] = useState(false);
    const [openChangeUsernameModal, setOpenChangeUsernameModal] = useState(false);
    const [openChangeEmailModal, setOpenChangeEmailModal] = useState(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [openChangeNameModal, setOpenChangeNameModal] = useState(false);
    const [openLogoutAllModal, setOpenLogoutAllModal] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

    return (
        <>
        <h1 className="columns-header">My Account</h1>
        <div className="columns">

            <LeftColumn isPublic={ false } />

            <div className="columns__center">
    
                <h2 className="columns__title">My Recipes</h2>

                    <button className="button__link">
                        <Link className="button__link--Link" to="/myrecipes">View or edit my recipes</Link>
                    </button>

                    <button className="button__link" onClick={ () => dispatch(clearSelectedRecipeAction()) }>
                        <Link className="button__link--Link" to="/submitrecipe">Submit a new recipe</Link>
                    </button>


                <h2 className="columns__title">My Account</h2>
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
            
            <MyRightColumn isPublic={ false } />
            
        </div>
        </>
    )
}



export { MyAccountPage as default }