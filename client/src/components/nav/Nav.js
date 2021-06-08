import React from 'react';
import NavTop from './NavTop.js';
import NavBottom from './NavBottom.js';
import NavPopout from './NavPopout.js';

const Nav = () => (
    <div className="center">
        <div className="nav__desktop">
            <NavTop />
            <NavBottom />
        </div>
        <div className="nav__mobile">
            <NavPopout />
        </div>
    </div>
);

export { Nav as default }