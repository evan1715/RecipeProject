//SERVER_ERROR
const serverErrorAction = (data) => {
    return {
        type: 'SERVER_ERROR',
        error: data
    }
}

//CLEAR_ERROR
const clearErrorAction = () => ({
    type: 'CLEAR_ERROR'
});

export {
    serverErrorAction,
    clearErrorAction
}