// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const ProvideAuth = ({ userState }) => {
    

//     return userState;
// }

// const useAuth = () => {
//     const isAuth = useSelector(state => state.accountReducer);
//     const [user, setUser] = useState(null);


//     useEffect(() => {
//         if (isAuth) {
//             if (user) {
//                 setUser(user)
//             } else {
//                 setUser(false);
//             }
//         }
//     }, [isAuth]);
    

//     return {
//         user,
//         login,
//         logout
//     }
// }

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthState = () => {
    const isAuthenticated = useSelector(state => state.accountReducer);
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setAuth(isAuthenticated);
        } else {
            setAuth(false);
        }
        return () => { isAuth }
    }, []);

    return isAuth;
}

export { useAuthState as default }