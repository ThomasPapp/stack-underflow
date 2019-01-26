import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleModal, toggleRegister } from '../../ducks/loginReducer';
import { logout } from '../../ducks/userReducer';

import Modal from '../Modal/Modal';
import Login from '../Login/Login';

import './nav.css';

class Nav extends Component {

    toggleDisplay = () => this.props.toggleModal(!this.props.displayModal);

    render() {
        return (
            <nav className="nav-container">
            {/* <h1>Stack Underflow</h1> */}
                <Link to="/" className="nav-logo"><h1>Stack Underflow</h1></Link>
                <div className="nav-links">
                    {/* <Link to='/forums'>Forums</Link> */}
                    {
                        !this.props.user.username ? <button onClick={ this.toggleDisplay }>Login</button>
                        : <button onClick={this.props.logout}>Logout</button>
                    }
                </div>

                <Modal display={this.props.displayModal} toggleDisplay={this.toggleDisplay} ModalContent={Login} />
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        displayModal: state.loginReducer.displayModal,
        user: state.userReducer.user
    };
}

export default connect(mapStateToProps, {toggleModal, toggleRegister, logout })(Nav);