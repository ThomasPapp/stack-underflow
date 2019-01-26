import React, { Component } from 'react';

import './thread.css';
import ViewThread from './ViewThread/ViewThread';
import Reply from './Reply/Reply';

export default class Thread extends Component {

    render() {
        return (
            <div className="thread-container">
                <ViewThread />

                <Reply />
            </div>
        );
    }
}