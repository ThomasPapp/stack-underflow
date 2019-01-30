import React from 'react';

import './post-info.css';

const PostInfo = props => (
    <div className="post-info-container">
        <h3>{props.title}</h3>

        <div className="post-info-date">
            <h4>{props.date}</h4>
        </div>

        {/* <div className="thread-info-title">
            <h2>{props.title}</h2>
        </div>
        <h4>{props.date}</h4> */}
    </div>
);

export default PostInfo;