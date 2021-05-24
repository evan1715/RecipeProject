import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RightColumn = (props) => {
    const { user } = useSelector(state => state.accountReducer);
    const userProfile = useSelector(state => state.userProfileReducer.user);

    return (
        <div className="columns__right">
            <img alt="my account icon" src={ !props.isPublic ? `/user/${user._id}/icon` : `/user/${userProfile._id}/icon`} />
            { !props.isPublic && 
                <button className="button__link">
                    <Link className="button__link--Link" to={ `/user?id=${user._id}` }>View my profile</Link>
                </button>
            }
        </div>
    )
}

export { RightColumn as default }