import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IosMenu from 'react-ionicons/lib/IosMenu';
// import useServerAPI from '../../hooks/useServerAPI.js';

const MyAccountMenu = () => {
    const history = useHistory();
    const isAuth = useSelector(state => state.accountReducer.authenticated);
    // const [showMenu, setShowMenu] = useState(false);
    const iconColor = isAuth ? 'green' : 'red';
    // const cursorPointer = { cursor: 'pointer' }
    // const iconSize = { size: '50px' }
    const verticalAlign = { verticalAlign: 'middle' }

    const handleClick = () => history.push('/myaccount');
    
// https://www.w3schools.com/howto/howto_js_dropdown.asp <---- try this out
    return (
        <div className="my-account-menu" 
        // onClick={() => setShowMenu(showMenu === true ? false : true)}
        >
            <button className="button button--menu" disabled={ !isAuth } onClick={ handleClick }>
                My Account <IosMenu className="dropdown-icon" 
                            fontSize="25px" 
                            color={ iconColor } 
                            style={ verticalAlign } />
            </button>
            {/* { showMenu &&
                <div className='popout-menu'>
                    <li>Test - 1</li>
                    <li>Test - 2</li>
                    <li>Test - 3</li>
                    <li>Test - 4</li>
                    <li>Test - 5</li>
                </div>
            } */}
        </div>

    )
}



export { MyAccountMenu as default }