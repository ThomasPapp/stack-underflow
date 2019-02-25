import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './account-bubble.css';

import avatar from '../../tpapp.jpg';

class AccountBubble extends Component {

    state = {
        open: false
    }

    toggleMenu = () => this.setState({ open: !this.state.open });

    logout = () => {
        this.props.logout();
        this.toggleMenu();
    }

    render() {
        return (
            <>
                <img src={avatar} alt="Avatar" className="avatar" onClick={this.toggleMenu} />

                <aside className={this.state.open ? "account-menu" : "account-menu-closed"}>
                    <div className="account-links">
                        <span className="account-link"><Link to="/account/change-pass" onClick={this.toggleMenu}>Change Password</Link></span>
                        <span className="account-link"><Link to="/account/change-email" onClick={this.toggleMenu}>Change Email</Link></span>
                        <span className="account-link"><Link to="/account/change-avatar" onClick={this.toggleMenu}>Change Avatar</Link></span>
                        <span className="account-link"><span onClick={this.logout}>Logout</span></span>
                    </div>
                </aside>
            </>
        )
    }

}

export default AccountBubble;