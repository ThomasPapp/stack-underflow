import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import './forum.css';

import CreateThread from '../Thread/CreateThread/CreateThread';
import Loading from '../../Loading/Loading';

class Forum extends Component {

    state = {
        topic: 0,
        forumName: '',
        threads: [],
        loading: true
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        if (!values.topic) {
            console.log("Error while fetching threads, invalid topic");
            return;
        }

        this.setState({ topic: values.topic });

        if (!values.action) {
            axios.get('/api/forum/threads/'+ values.topic)
            .then(res => {
                console.log(res);
                this.setState({ 
                    forumName: res.data.forumName,
                    threads: res.data.threads,
                    loading: false
                });
            })
            .catch(err => console.log('Error while fetching threads', err));
        }
    }

    render() {
        const values = queryString.parse(this.props.location.search);
        if (values.action && values.action === "create") {
            return <CreateThread topic={this.state.topic} history={this.props.history} />
        }
        
        if (this.state.loading) {
            return <Loading center={true} />
        }

        const threads = this.state.threads.map(thread => <ThreadEntry key={thread.thread_id} id={thread.thread_id} topic={this.state.topic} name={thread.title} />);
        return (
            <div className="forum-container">
                <div className="forum-info">
                    <h3>{this.state.forumName}</h3>
                    <div className="forum-stats">
                        <h3>Replies / Views</h3>
                        <h3>Last Post</h3>
                    </div>
                </div>
                <hr />
                <div className="forum-thread-create-container">
                    <Link to={`/forum?topic=${this.state.topic}&action=create`}><button>Create Thread</button></Link>
                </div>

                {threads}
            </div>
        );
    }
}

const ThreadEntry = props => (
    <div className="forum-thread-entry">
        <div className="forum-thread-name">
            <Link to={`/forum/thread?topic=${props.topic}&viewThread=${props.id}`}><h4>{props.name}</h4></Link>
        </div>
        <div className="forum-thread-info">
            <div className="forum-thread-views">
                <h4>Replies: 100</h4>
                {/* <h4>Views: 1,000</h4> */}
            </div>

            <div className="forum-thread-views">
                <h4>Test</h4>
            </div>
        </div>
    </div>
);

export default Forum;