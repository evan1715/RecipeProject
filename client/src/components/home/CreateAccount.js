import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import CreateAccountModal from '../nav/CreateAccountModal.js';

export default function CreateAccount() {
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    const [openCreateAccountModal, setOpenCreateAccountModal] = useState('');

    return (
        <div className="center create-account-home-page-container">
            <div>
                <div>
                    <h1>The home for all your recipes</h1>
                    <p>Browse and save all of your favorite recipes in one place. Search for ingredients, category, or access 1000's of recipes from the comfort of your home or
                    on your mobile device.</p>
                    { isAuth ? 
                        <Link to='/myrecipes'>
                            <button className="button" onClick={ () => setOpenCreateAccountModal('false') }>
                                View My Recipes
                            </button>
                        </Link> 
                        :
                        <><button className="button" onClick={ () => setOpenCreateAccountModal('true') }>
                            Create An Account
                        </button>
                        <CreateAccountModal openCreateAccountModal={ openCreateAccountModal } handleCloseModal={ () => setOpenCreateAccountModal('') } /> </>
                    }
                </div>
{/*
                <div>
                    <img src="https://images.pexels.com/photos/6232438/pexels-photo-6232438.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="placeholder" />
                </div>
*/}
            </div>
        </div>
    )
}
