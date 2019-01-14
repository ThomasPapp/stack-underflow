import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleRegister, toggleRecover } from '../../ducks/loginReducer';

import Register from '../Register/Register';
import RecoverAccount from '../Recover/RecoverAccount';

// import './login.css';

class Login extends Component {

    toggleRegister = () => this.props.toggleRegister(!this.props.register);

    toggleRecover = () => this.props.toggleRecover(!this.props.recover);

    render() {

        // render the register component
        if (this.props.register) {
            return <Register />
        }

        // render the recover component
        if (this.props.recover) {
            return <RecoverAccount />;
        }

        // render the login component
        return (
            <div className="modal-form-container">
                <h1>Login to Your Account</h1>
                <form className="modal-form">
                    <input type="text" placeholder="Username" maxLength="12" required />
                    <input type="password" placeholder="Password" minLength="10" maxLength="20" required />
                    <input type="submit" value="Login" />

                    <div className="modal-form-help">
                        <button type="button" onClick={this.toggleRegister}>Register</button> &bull; <button type="button" onClick={this.toggleRecover}>Recover Account</button>
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

export default connect(mapStateToProps, { toggleRegister, toggleRecover }) (Login);