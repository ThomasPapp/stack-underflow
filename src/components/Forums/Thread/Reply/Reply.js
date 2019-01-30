import React, { Component } from 'react';
import { Editor } from 'draft-js';
import { compose } from 'redux'; 
import { connect } from 'react-redux';
import axios from 'axios';

import './reply.css';

// components
import RichEditorConnector from '../RichEditor/RichEditorConnector';

class Reply extends Component {

    postReply = () => {
        // safety check to make sure that the user is still logged in
        if (!this.props.user.username) {
            return;
        }

        // prevents people from posting empty replies
        if (this.props.isEmpty()) {
            return;
        }

        const { user_id } = this.props.user;
        const { thread } = this.props;
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
        .replace(/ /g, '-');
        const content = this.props.getRawContent();

        console.log("body:", user_id, formattedDate, thread, content);

        axios.post('/api/forum/thread/reply', { user_id, formattedDate, thread, content })
        .then(res => {
            this.props.addReply(res.data[0]);
            this.props.clear();
        })
        .catch(err => console.log("error while posting reply", err));
    }

    render() { 
        return (
            <div className="reply">
                <div className="reply-title">
                    <h3>Post a Reply</h3>
                </div>
               <div className="reply-editor">
                    <Editor 
                        editorState={this.props.editorState}
                        onChange={this.props.onChange}
                        handleKeyCommand={this.props.handleKeyCommand}
                    />
               </div>

               <div className="reply-footer">
                    <button onClick={this.postReply}>Post Reply</button>
               </div>
            </div>
        );
    }

}

export default RichEditorConnector() (Reply);