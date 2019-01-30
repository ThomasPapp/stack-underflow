import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';

import './post-content.css';

const PostContent = props => (
    <div className="post-content-container">
        <div className="post-content">
            <Editor
                readOnly
                editorState={props.editorState}
            />
        </div>
    </div>
);

export default PostContent;

PostContent.propTypes = {
    editorState: PropTypes.object
}