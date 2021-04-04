import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import CreateAccountModal from './CreateAccountModal.js';

export default function CreateAccount() {
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    const [openModal, setOpenModal] = useState('');

    return (
        <div className="center create-account-home-page-container">
            <div>
                <div>
                    <h1>The home for all your recipes</h1>
                    <p>Browse and save all of your favorite recipes in one place. Search for ingredients, category, or access 1000's of recipes from the comfort of your home or
                    on your mobile device.</p>
                    {/* This button will be a <Link> to /createaccount where redux will dispatch whatever action will create a new user */}
                    {/* <Link to='/createaccount'><button className='button'>Create An Account</button></Link> */}
                    { isAuth ? 
                        <Link to='/about'><button className="button" onClick={ () => setOpenModal('false') }>View My Recipes</button></Link> :
                        <><button className="button" onClick={ () => setOpenModal('true') }>Create An Account</button>
                        <CreateAccountModal openModal={ openModal } handleCloseModal={ () => setOpenModal('') } /> </>
                    }
                </div>

                <div>
                    <img src="https://images.pexels.com/photos/6232438/pexels-photo-6232438.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="placeholder" />
                </div>
            </div>
        </div>
    )
}