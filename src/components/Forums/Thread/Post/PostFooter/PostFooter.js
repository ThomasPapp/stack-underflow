import React from 'react';
import { connect } from 'react-redux';

import './post-footer.css';

const PostFooter = props => {
    const isAuthor = props.user.user_id === +props.author;
    // console.log("props2:", props);
    return (
        <div className="post-footer-container">
            <button onClick={() => props.repAuthor(+props.author)}>Rep Author</button>
    
            {/* { isAuthor && <button>Edit</button> }

            { isAuthor && <button onClick={ props.deleteThread }>Delete</button> } */}
    
            <span id="thumb-down" className="fa fa-thumbs-down thumbs-unselected" />
            <span className="fa fa-thumbs-up thumbs-unselected" />
        </div>
    );
}

const mapStateToProps = state => state.userReducer;

export default connect(mapStateToProps) (PostFooter);