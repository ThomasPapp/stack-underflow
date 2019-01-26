import React from 'react';

import './thread-info.css';

const ThreadInfo = props => (
    <div className="thread-info-container">
        <h3>{props.title}</h3>

        <div className="thread-info-date">
            <h4>{props.date}</h4>
        </div>

        {/* <div className="thread-info-title">
            <h2>{props.title}</h2>
        </div>
        <h4>{props.date}</h4> */}
    </div>
);

export default ThreadInfo;