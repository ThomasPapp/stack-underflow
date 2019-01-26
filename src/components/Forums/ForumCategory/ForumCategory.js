import React from 'react';

import './forum-category.css';

import SubForum from '../SubForum/SubForum';

const ForumCategory = props => {
    const subForums = props.subForums.map(subForum => <SubForum key={subForum.id} id={subForum.id} name={subForum.name} />)
    return (
        <div className="forum-category-container">
            <div className="forum-category">
                <h3>{props.name}</h3>
                <div className="forum-category-info">
                    <h3>Topics</h3>
                    <h3>Posts</h3>
                    <h3>Latest Post</h3>
                </div>
            </div>
            <hr/>
            { subForums }
        </div>
    );
}

export default ForumCategory;