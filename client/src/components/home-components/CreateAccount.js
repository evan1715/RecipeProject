import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import CreateAccountModal from './CreateAccountModal.js';

export default function CreateAccount() {
    const isAuthenticated = useSelector(state => state.accountReducer);
    const [openModal, setOpenModal] = useState('');
    const isAuth = isAuthenticated.authenticated;

    const myRecipesOrCreateAccount = () => {
        if (!isAuth) {
            setOpenModal('true');
        }
    }

    return (
        <div className='center create-account-home-page-container'>
            <div>
                <div>
                    <h1>The home for all your recipes</h1>
                    <p>Browse and save all of your favorite recipes in one place. Search for ingredients, category, or access 1000's of recipes from the comfort of your home or
                    on your mobile device.</p>
                    {/* This button will be a <Link> to /createaccount where redux will dispatch whatever action will create a new user */}
                    {/* <Link to='/createaccount'><button className='button'>Create An Account</button></Link> */}
                    <button className='button' onClick={ myRecipesOrCreateAccount }>
                        { !isAuth ? 'Create An Account' : <Link to='/about'>View My Recipes</Link> }
                    </button>
                    <CreateAccountModal openModal={ openModal } handleCloseModal={ () => setOpenModal('') } />
                </div>

                <div>
                    <img src='https://images.pexels.com/photos/6232438/pexels-photo-6232438.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='placeholder' />
                </div>
            </div>
        </div>
    )
}