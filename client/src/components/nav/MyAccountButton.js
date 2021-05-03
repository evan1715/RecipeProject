import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';

const MyAccountButton = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    const iconColor = isAuth ? 'green' : 'red';
    const verticalAlign = { verticalAlign: 'middle' }

    return (
        <button className="my-account__button" disabled={ !isAuth }>
            { isAuth ? 
                <Link className="my-account__button--link" to="/myaccount">
                    My Account <IosMenu className="my-account__button--icon" 
                                fontSize="25px" 
                                color={ iconColor } 
                                style={ verticalAlign } />
                </Link>
            : 
                <div className="my-account__button--link">
                    My Account <IosMenu className="my-account__button--icon" 
                    fontSize="25px" 
                    color={ iconColor } 
                    style={ verticalAlign } />
                </div>
            }
        </button>
    )
}

export { MyAccountButton as default }