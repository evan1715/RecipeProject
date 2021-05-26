import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';

const MyAccountButton = () => {
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    const iconColor = isAuth ? 'green' : 'red';
    const verticalAlign = { verticalAlign: 'middle' }

    return (
        <>
            <Link className="nav-bottom__link" to="/myaccount">My Account</Link>
            <button className="nav-bottom__btn" disabled={ !isAuth }>
                { isAuth ? 
                    <Link className="nav-bottom__btn--link" to="/myaccount">
                        My Account <IosMenu
                                    className="nav-bottom__btn--icon"
                                    color={ iconColor }
                                    fontSize="25px"
                                    style={ verticalAlign }
                                    />
                    </Link>
                    :
                    <div className="nav-bottom__btn--link">
                        My Account <IosMenu
                                    className="nav-bottom__btn--icon"
                                    color={ iconColor }
                                    fontSize="25px"
                                    style={ verticalAlign }
                                     />
                    </div>
                }
            </button>
        </>
    )
}

export { MyAccountButton as default }