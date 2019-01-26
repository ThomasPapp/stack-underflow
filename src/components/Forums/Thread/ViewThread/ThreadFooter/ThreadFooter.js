import React from 'react';
import { connect } from 'react-redux';

import './thread-footer.css';

const ThreadFooter = props => {
    const isAuthor = props.user.user_id === +props.author;
    return (
        <div className="thread-footer-container">
            <button>Rep Author</button>
    
            { isAuthor && <button>Edit</button> }

            { isAuthor && <button onClick={props.deletePost}>Delete</button> }
    
            <span id="thumb-down" className="fa fa-thumbs-down thumbs-unselected" />
            <span className="fa fa-thumbs-up thumbs-unselected" />
        </div>
    );
}

const mapStateToProps = state => state.userReducer;

export default connect(mapStateToProps) (ThreadFooter);