import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleRegister, toggleRecover } from '../../ducks/loginReducer';

import './register.css';

class Register extends Component {

    toggleLogin = () => this.props.toggleRegister(false);

    toggleRecover = () => this.props.toggleRecover(!this.props.recover);

    render() {
        return (
            <div className="modal-form-container">
                <h1>Register an Account</h1>
                <form className="modal-form-large">
                    <input type="text" placeholder="Username" maxLength="12" required />
                    <input type="email" placeholder="Email Address" required />
                    <input type="password" placeholder="Password" minLength="10" maxLength="20" required />
                    <input type="password" placeholder="Confirm Password" minLength="10" maxLength="20" required />

                    <input type="submit" value="Register" />

                    <div className="modal-form-help">
                        <button type="button" onClick={this.toggleLogin}>Login Instead</button> &bull; <button type="button" onClick={this.toggleRecover}>Recover Account</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        register: state.loginReducer.register,
        recover: state.loginReducer.recover
    }
}

export default connect(mapStateToProps, { toggleRegister, toggleRecover }) (Register);