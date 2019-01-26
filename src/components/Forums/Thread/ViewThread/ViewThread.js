import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { compose } from 'redux';
import queryString from 'query-string';

// components
import AuthorInfo from './AuthorInfo/AuthorInfo';
import ThreadInfo from './ThreadInfo/ThreadInfo';
import ThreadContent from './ThreadContent/ThreadContent';
import ThreadFooter from './ThreadFooter/ThreadFooter';
import Loading from '../../../Loading/Loading';
import RichEditorConnector from '../RichEditor/RichEditorConnector';

import './view-thread.css';

class ViewThread extends Component {

    state = {
        thread: {},
        loading: true
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        if (!values.topic || !values.viewThread) {
            console.log("Error while fetching thread: missing params");
            return;
        }

        axios.get(`/api/forum/thread/${values.viewThread}`)
        .then(res => this.setState({ thread: res.data[0], loading: false }))
        .catch(err => console.log("Error while fetching thread", err));
    }

    editPost = () => {

    }

    deletePost = () => {
        this.setState({ loading: true });
        axios.delete(`/api/forum/thread/${this.state.thread.thread_id}`)
        .then(() => this.props.history.push(`/forum?topic=${this.state.thread.forum}`))
        .catch(err => console.log("Error while deleting post", err));
    }

    likePost = () => {

    }

    dislikePost = () => {

    }

    render() {
        if (this.state.loading) {
            return <Loading center={true} />
        }
        const editorState = this.props.getEditorState(this.state.thread.content);
        return (
            <div className="thread-view-container">

                <AuthorInfo 
                    username={this.state.thread.username} 
                    avatar={this.state.thread.avatar}
                    rep={this.state.thread.reputation}
                />

                <div className="thread-view-body">
                    <ThreadInfo 
                        title={this.state.thread.title}
                        date={this.state.thread.date}
                    />

                    <ThreadContent 
                        editorState={editorState}
                    />

                    <ThreadFooter 
                        likePost={this.likePost}
                        dislikePost={this.dislikePost}
                        editPost={this.editPost}
                        deletePost={this.deletePost}
                        author={this.state.thread.author}
                        user={this.props.user}
                    />
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => state.userReducer;

export default compose(connect(mapStateToProps), RichEditorConnector(true), withRouter) (ViewThread);