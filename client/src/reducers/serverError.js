const serverErrorReducer = (state = { error: null }, action) => {
    switch (action.type) {
        case 'SERVER_ERROR':
            return {
                error: action.error
            }
        case 'CLEAR_ERROR':
            return {
                error: null
            }
        default:
            return state;
    }
}


export { serverErrorReducer as default };