import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateAccountModal from '../nav/CreateAccountModal.js';
import image from '../../images/homepage_image.jpeg';

const CreateAccount = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    const [openCreateAccountModal, setOpenCreateAccountModal] = useState('');

    return (
        <div className="create-account">
            <div className="create-account__container">
                <div className="create-account__container--left">
                    <h1>The home for all your recipes</h1>
                    <p>Browse and save all of your favorite recipes in one place. Search for ingredients, category, or access 1000's of recipes from the comfort of your home or
                    on your mobile device.</p>
                    { isAuth ? 
                        <Link to="/submitrecipe">
                            <button className="button" onClick={ () => setOpenCreateAccountModal('false') }>
                                Submit a Recipe
                            </button>
                        </Link> 
                        :
                        <><button className="button" onClick={ () => setOpenCreateAccountModal('true') }>
                            Create An Account
                        </button>
                        <CreateAccountModal openCreateAccountModal={ openCreateAccountModal } handleCloseModal={ () => setOpenCreateAccountModal('') } /> </>
                    }
                </div>

                <div className="create-account__container--right">
                    <img alt="placeholder" src={ image }/>
                </div>
            </div>
        </div>
    )
}

export { CreateAccount as default }