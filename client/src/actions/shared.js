// import { showLoading, hideLoading } from 'react-redux-loading-bar'
// import axios from 'axios'

// here is where our handleInitialData thunk will live 

// export const RECEIVE_DATA = 'RECEIVE_DATA'

// function receiveData(data) {
//     return {
//         type: RECEIVE_DATA,
//         data
//     }
// }

// export function handleInitialData(url, number) {
//     const API = '3273002619e04c89b625192940c7dbb1'
//     // API key is concatonated onto the end of the url passed to handleInitialData so that it can be declared once inside this function rather than everytime
//     // we want to make a request to the public API in other files.

//     const options = {
//         method: 'GET',
//         url: url.concat(`?apiKey=${API}`),
//         params: { number: number }
//     }

//     return dispatch => {
//         dispatch(showLoading())
        
//         return axios.request(options)
//         .then(res => {
//             console.log(res)
//             dispatch(receiveData(res))
//             dispatch(hideLoading())
//         }).catch(error => {
//             console.log(error)
//             dispatch(hideLoading())
//         })
//     }
// }

// Now I need to build out the recipes reducer and make a receiveData action type to assign the data being returned from the API to the recipes state