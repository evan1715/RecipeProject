import React from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'

export default function useAxios(url) {
    const dispatch = useDispatch()

    React.useEffect(() => {
        Axios({
            method: 'GET',
            url: url
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        }) 
    }, [dispatch, url])
}