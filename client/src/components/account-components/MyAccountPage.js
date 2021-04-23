import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    UploadUserIconModal, 
    ChangeUsernameModal,
    ChangeEmailModal,
    ChangePasswordModal,
    ChangeNameModal,
    LogoutAllModal, 
    DeleteAccountModal 
} from './MyAccountModals.js';
import { clearUserRecipesAction } from '../../actions/userRecipes.js';
import useServerAPI from '../../hooks/useServerAPI.js';

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, icon } = useSelector(state => state.accountReducer);
    const userRecipes = useSelector(state => state.userRecipesReducer);
    const [approveSubmitRecipePush, setApproveSubmitRecipePush] = useState(false);
    const [openUploadUserIconModal, setOpenUploadUserIconModal] = useState(false);
    const [openChangeUsernameModal, setOpenChangeUsernameModal] = useState(false);
    const [openChangeEmailModal, setOpenChangeEmailModal] = useState(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [openChangeNameModal, setOpenChangeNameModal] = useState(false);
    const [openLogoutAllModal, setOpenLogoutAllModal] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

    useEffect(() => {
        dispatch(useServerAPI('getIcon', user._id));
    }, []);

    useEffect(() => {
        if (approveSubmitRecipePush) {
            history.push('/submitrecipe')
        }
    }, [userRecipes])

    return (
        <div className="my-account-page__container">

            <div className="my-account-page__userinfo">
                <h3 className="center">My recent recipes</h3>
                <ol>
                    <li>placeholder for recipes</li>
                </ol>

                <h3 className="center">User Info:</h3>
                <ol>
                    <li>Username: { user.username }</li>
                    <li>Email: { user.email }</li>
                    <li>Name: { user.name }</li>
                </ol>
            </div>

            
            <div className="my-account-page__center">
    
                <h2>My Recipes</h2>
                    <button className="button" onClick={ () => history.push('/myrecipes') }>View or edit my recipes</button>
                    <button className="button" onClick={ () => {
                        dispatch(clearUserRecipesAction());
                        setApproveSubmitRecipePush(true);
                    }}>Submit a new recipe</button>
                

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