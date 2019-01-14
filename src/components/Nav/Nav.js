import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleModal, toggleRegister } from '../../ducks/loginReducer';

import Modal from '../Modal/Modal';
import Login from '../Login/Login';

import './nav.css';

class Nav extends Component {

    toggleDisplay = () => {
        const display = !this.props.displayModal;
        this.props.toggleModal(display);
        
        // reset the register/recover toggle when closing the modal
        if (!display && (this.props.register || this.props.recover)) {
            this.props.toggleRegister(false);
        }
    }

    render() {
        return (
            <nav className="nav-container">
                <h1>Stack Underflow</h1>
                <div className="nav-links">
                    {/* <Link to='/forums'>Forums</Link> */}
                    <button onClick={ this.toggleDisplay }>Login</button>
                </div>

                <Modal display={this.props.displayModal} toggleDisplay={this.toggleDisplay} ModalContent={Login} />
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return state.loginReducer;
}

export default connect(mapStateToProps, {toggleModal, toggleRegister })(Nav);