import React from 'react';

import './author-info.css';

const AuthorInfo = props => {
    const username = props.username;
    return (
        <div className="author-info-container">
            <h3>{username}</h3>
            { props.avatar && <img src={props.avatar} alt="avatar" /> }
            <h3>Reputation: { props.rep }</h3>
        </div>
    );
}

export default AuthorInfo;