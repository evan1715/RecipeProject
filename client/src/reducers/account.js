//~~~file not currently in use because i can't get it to work. pending update~~~~~~
/*  if (action.type === 'CREATE_ACCOUNT') {
        return 
    }
*/
const accountReducer = (state = {}, action) => {
    switch (action.type) {
        // case 'CREATE_ACCOUNT':
        //     return [...state, action.user];
        case 'LOGIN':
            // console.log("From reducer:", action.user, action.user);
            return {
                user: action.user,
                token: action.token
            }
        // case 'LOGIN_ERROR':
        //     return {
                
        //     }
        // case 'LOGOUT':
        //     return {}
        // case 'LOGOUT_ALL':
        //     return;
        // case 'GET_USER':
        //     return;
        // case 'UPDATE_USER':
        //     return;
        // case 'DELETE_ACCOUNT':
        //     return;
        // case 'UPLOAD_USER_ICON':
        //     return;
        // case 'GET_USER_ICON':
        //     return;
        // case 'DELETE_USER_ICON':
        //     return;
        default:
            return state;
    }
}

export { accountReducer as default };








// const defaultState = {
//     token: localStorage.getItem('token'),
//     user: undefined,
//     loading: false,
//     authenticated: undefined
// }

// const accountReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case 'USER_LOADING':
//             return {
//                 ...state,
//                 loading: true
//             }
//         case 'USER_LOADED':
//             return {
//                 ...state,
//                 authenticated: true,
//                 loading: false,
//                 user: action.user
//             }
//         case 'LOGIN_SUCCESS':
//         case 'REGISTER_SUCCESS':
//             return {
//                 ...state,
//                 ...action.user,
//                 authenticated: true,
//                 loading: false
//             }
//         case 'REGISTER_FAIL':
//             return {
//                 ...state,
//                 token: undefined,
//                 user: undefined,
//                 loading: false,
//                 authenticated: false
//             }
// case 'LOGIN':
//     return {
//         ...state, 
//         ...action.user,
//         authenticated: true,
//     }
// case 'LOGIN_ERROR':
//     localStorage.removeItem('token');
//     return {
//         ...state,
//         token: undefined,
//         user: undefined,
//         loading: false,
//         authenticated: false
//     }