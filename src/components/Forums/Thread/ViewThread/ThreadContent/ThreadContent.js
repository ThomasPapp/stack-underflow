import React from 'react';
import { Editor } from 'draft-js';

import './thread-content.css';

const ThreadContent = props => (
    <div className="thread-content-container">
        <div className="thread-content">
            <Editor
                readOnly
                editorState={props.editorState}
            />
        </div>
    </div>
);

export default ThreadContent;