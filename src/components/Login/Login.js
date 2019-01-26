import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleModal, toggleRegister, toggleRecover, updateUsername, updatePassword, updateLoading, updateErrorMessage } from '../../ducks/loginReducer';
import { updateUser } from '../../ducks/userReducer';

import Register from '../Register/Register';
import RecoverAccount from '../Recover/RecoverAccount';
import Loading from '../Loading/Loading';

// import './login.css';

class Login extends Component {

    // onChange handling
    updateUsername = e => this.props.updateUsername(e.target.value);
    updatePassword = e => this.props.updatePassword(e.target.value);

    // modal handling
    toggleRegister = () => this.props.toggleRegister(!this.props.register);
    toggleRecover = () => this.props.toggleRecover(!this.props.recover);

    // logging in
    login = e => {
        // prevent the form from refreshing the page
        e.preventDefault();

        this.props.updateLoading(true);

        const { username, password } = this.props;
        console.log("username:", username)
        axios.post("/auth/login", { username, password })
        .then(res => {
            this.props.updateUser(res.data);
            this.props.toggleModal(false);
        })
        .catch(err => {
            this.props.updateLoading(false);
            this.props.updateErrorMessage(err.response.data)
        });
    }

    render() {

        // render the register component
        if (this.props.register) {
            return <Register />
        }

        // render the recover component
        if (this.props.recover) {
            return <RecoverAccount />;
        }

        if (this.props.loading) {
            console.log("loading bitch")
        }

        // render the login component
        return (
            <div className="modal-form-container">
                <h1>Login to Your Account</h1>
                {
                    this.props.loading && <Loading />
                }
                {
                        this.props.errorMessage && <h5 className="modal-form-error">{ this.props.errorMessage }</h5>
                }
                <form className="modal-form" onSubmit={this.login}>
                    <input type="text" placeholder="Username" maxLength="12" onChange={this.updateUsername} value={this.props.username} required />
                    <input type="password" placeholder="Password" minLength="10" maxLength="20" onChange={this.updatePassword} value={this.props.password} required />
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
        username: state.loginReducer.username,
        password: state.loginReducer.password,
        errorMessage: state.loginReducer.errorMessage,
        register: state.loginReducer.register,
        recover: state.loginReducer.recover,
        loading: state.loginReducer.loading
    }
}

export default connect(mapStateToProps, { toggleModal, toggleRegister, toggleRecover, updateUsername, updatePassword, updateLoading, updateErrorMessage, updateUser }) (Login);