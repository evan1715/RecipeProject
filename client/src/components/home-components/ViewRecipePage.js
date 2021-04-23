import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ViewRecipePage = () => {
    const dispatch = useDispatch();
    const userRecipesReducer = useSelector(state => state.userRecipesReducer);


    return (
        <div>

        </div>
    )
}


export { ViewRecipePage as default }