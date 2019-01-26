import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sub-forum.css';

class SubForum extends Component {

    render() {
        return (
            <div className="sub-forum-container">
                <div className="sub-forum-name">
                    <img src="https://www.freeiconspng.com/uploads/forum-icon-20.png"/>
                    <Link to={ `/forum?topic=${this.props.id}` }><h4>{this.props.name}</h4></Link>
                </div>

                <div className="sub-forum-info">
                    <h3>40</h3>
                    <h3>1,000</h3>
                    <h3>null</h3>
                </div>
            </div>
        );
    }
}

export default SubForum;