import React from 'react';

import './post.css';

// components
import RichEditorConnector from '../RichEditor/RichEditorConnector';
import AuthorInfo from '../ViewThread/AuthorInfo/AuthorInfo';
import PostInfo from './PostInfo/PostInfo'
import PostContent from './PostContent/PostContent';
import PostFooter from './PostFooter/PostFooter';

const Post = props => {
    const { username, avatar, rep, title, date, content, author } = props;

    console.log("props:", props);

    const editorState = props.getEditorState(content);
    return (
        <div className="post-container">
            <AuthorInfo
                username={username}
                avatar={avatar}
                rep={rep}
            />

            <div className="post-body">
                <PostInfo
                    title={title}
                    date={date}
                />

                <PostContent
                    editorState={editorState}
                />

                <PostFooter
                    author={author}
                    deleteThread={props.deleteThread}
                    deletePost={props.deletePost}
                />
            </div>

        </div>
    );
}

export default RichEditorConnector(true) (Post);