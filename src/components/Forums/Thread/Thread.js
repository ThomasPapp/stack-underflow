import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';

import './thread.css';

// components
import Loading from '../../Loading/Loading';
import Reply from './Reply/Reply';
import Post from './Post/Post';

class Thread extends Component {

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

    deleteThread = () => {
        console.log("delete")
        this.setState({ loading: true });
        axios.delete(`/api/forum/thread/${this.state.thread.thread_id}`)
        .then(() => this.props.history.push(`/forum?topic=${this.state.thread.forum}`))
        .catch(err => console.log("Error while deleting post", err));
    }

    deletePost = () => {
        this.setState({ loading: true });
        axios.delete(`/api/forum/thread/${this.state.thread.thread_id}`)
        .then(() => this.props.history.push(`/forum?topic=${this.state.thread.forum}`))
        .catch(err => console.log("Error while deleting post", err));
    }
    
    addReply = reply => {
        const thread = {...this.state.thread};
        thread.replies.push(reply);
        this.setState({ thread })
    }

    repAuthor = author => {
        // console.log("author:", author, "user:", this.props.user.user_id);

        if (this.props.user.user_id === author) {
            alert("You cannot rep yourself!");
            return;
        }

        axios.put("/api/forum/thread/rep", { id: author })
        .then(res => {
            const { user_id, reputation } = res.data;

            let thread = { ...this.state.thread };
            let replies = [];

            // check replies if there are any
            if (thread.replies[0]) {
                thread.replies = replies = this.state.thread.replies.map(reply => {
                    if (reply.post_author !== user_id) {
                        return { ...reply };
                    }

                    return { ...reply, reputation };
                });
            }

            // check the main post
            if (+thread.author === user_id) {
                thread.reputation = reputation;
            }

            this.setState({ thread });
        })
        .catch(err => console.log("error while repping user", err));
    }

    render() {
        if (this.state.loading) {
            return <Loading center={true} />
        }

        console.log("info", this.state.thread);
        // console.log("replies:", this.state.thread.replies);

        // generate the replies
        const replies = this.state.thread.replies.map(reply => 
        <Post 
            key={reply.post_id}
            username={reply.username}
            avatar={reply.avatar}
            rep={reply.reputation}
            date={reply.date}
            content={reply.content}
            author={reply.post_author}
            deletePost={this.deletePost}
            repAuthor={this.repAuthor}
        />);

        return (
            <div className="thread-container">

                {/* The main thread post */}
                <Post
                    username={this.state.thread.username}
                    avatar={this.state.thread.avatar}
                    rep={this.state.thread.reputation}
                    title={this.state.thread.title}
                    date={this.state.thread.date}
                    content={this.state.thread.content}
                    author={this.state.thread.author}
                    deleteThread={this.deleteThread}
                    repAuthor={this.repAuthor}
                />

                {/* The thread replies */}
                { replies }

                {/* The reply - only render if logged in */}
                { 
                    this.props.user.username && 
                    <Reply 
                        user={this.props.user} 
                        thread={this.state.thread.thread_id}
                        addReply={this.addReply}
                    /> 
                }
            </div>
        );
    }
}

const mapStateToProps = state => state.userReducer;

export default connect(mapStateToProps) (Thread);