import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useServerAPI from '../../hooks/useServerAPI.js';
import { LogoutAllModal, DeleteAccountModal } from './AccountModals.js';

const MyAccountPage = () => {
    // const dispatch = useDispatch();
    const history = useHistory();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [openLogoutAllModal, setOpenLogoutAllModal] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
    //view my recipes
    //submit a new recipe
    console.log("From MyAccountPage:", user, token, isAuth);
    //log out of all locations
    //edit/update profile such as username, email, password, name
    //delete my account
    //upload icon
    //get icon
    //delete icon


    return (
        <div>
            <h2>Recipes</h2>
                <button className='button' onClick={ () => history.push('/myrecipes') }>View or edit my recipes</button>
                <button className='button' onClick={ () => history.push('/submitrecipe') }>Submit a new recipe</button>
            
            <h2>My Account</h2>
                <li>Upload or modify user icon</li>
                <li>Change username, email, password, or name</li>
                <>
                    <button className='button' onClick={ () => setOpenLogoutAllModal(true) }>
                        Log out of all locations
                    </button>
                    <LogoutAllModal 
                        openLogoutAllModal={ openLogoutAllModal } 
                        handleCloseModal={ () => setOpenLogoutAllModal(false) } 
                    />
                </>
                <>
                    <button className='button' onClick={ () => setOpenDeleteAccountModal(true) }>
                        Delete my account
                    </button>
                    <DeleteAccountModal 
                        openDeleteAccountModal={ openDeleteAccountModal } 
                        handleCloseModal={ () => setOpenDeleteAccountModal(false) } 
                    />
                </>
        </div>
    )
}



export { MyAccountPage as default }