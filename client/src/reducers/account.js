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
                user: action.user,
                token: token,
                authenticated: true
            }
        case 'UPDATE_USER':
            return {
                user: action.user,
                token: token,
                authenticated: true
            }
        // case 'UPLOAD_USER_ICON':
        //     return;
        case 'GET_USER_ICON':
            return {
                user_icon: action.icon
            }
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