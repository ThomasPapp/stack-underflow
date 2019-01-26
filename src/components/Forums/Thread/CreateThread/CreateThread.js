import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import { Editor } from 'draft-js';
import RichEditorConnector from '../RichEditor/RichEditorConnector';

import './create-thread.css';

class CreateThread extends Component {

    state = {
        title: ''
    }

    // onChange handling
    updateTitle = e => this.setState({ title: e.target.value });

    postThread = e => {
        e.preventDefault();

        // prevents people posting empty threads
        if (this.props.isEmpty()) {
            return;
        }

        const { title } = this.state;
        const { user_id } = this.props.user;
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
        .replace(/ /g, '-');
        const topic = this.props.topic;

        // convert the editor content to storable format
        const content = this.props.getRawContent();

        axios.post('/api/forum/threads', {title, user_id, topic, formattedDate, content})
        .then(res => this.props.history.push(`/forum/thread?topic=${res.data[0].forum}&viewThread=${res.data[0].thread_id}`))
        .catch(err => console.log("Error while creating thread", err));
    }

    render() {
        return (
            <div className="create-thread-container">
                <div className="create-thread-tools">
                </div>
                <hr />

                <form className="create-thread-form" onSubmit={this.postThread}>
                    <div className="create-thread-title">
                        <input type="text" placeholder="Thread Title" value={this.state.title} onChange={this.updateTitle} required />
                    </div>

                    <div className="create-thread-content">
                        <Editor
                            editorState={this.props.editorState}
                            onChange={this.props.onChange}
                            handleKeyCommand={this.props.handleKeyCommand}
                        />
                    </div>

                    <div className="create-thread-post">
                        <input type="submit" value="Post Thread" />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => state.userReducer;

export default compose(connect(mapStateToProps), RichEditorConnector()) (CreateThread);