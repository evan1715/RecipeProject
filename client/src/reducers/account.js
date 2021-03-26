// const defaultState = {
//     user: undefined,
//     token: localStorage.getItem('token'),
//     authenticated: undefined
// }

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.user.user,
                token: action.user.token,
                authenticated: true
            }
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                authenticated: false
            }
        case 'GET_USER':
            return {
                authenticated: true,
                user: action.user,
                token: token
            }
        // case 'UPDATE_USER':
        //     return;
        // case 'UPLOAD_USER_ICON':
        //     return;
        // case 'GET_USER_ICON':
        //     return;
        // case 'DELETE_USER_ICON':
        //     return;
        case 'SERVER_ERROR':
            return {
                error: action.error
            }
        default:
            return state;
    }
}



export { accountReducer as default };