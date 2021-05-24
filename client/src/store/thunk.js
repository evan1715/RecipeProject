//Sourced from https://github.com/reduxjs/redux-thunk/blob/master/src/index.js
//Full package - https://github.com/reduxjs/redux-thunk
//License https://github.com/reduxjs/redux-thunk/blob/master/LICENSE.md

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        return next(action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;