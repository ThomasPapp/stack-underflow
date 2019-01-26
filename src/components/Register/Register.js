import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleModal, toggleRegister, toggleRecover, updateLoading } from '../../ducks/loginReducer';
import { updateUser } from '../../ducks/userReducer';

import Loading from '../Loading/Loading';

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',

        errorMessage: ''
    }

    // onChange event handling
    updateUsername = e => this.setState({ username: e.target.value });
    updateEmail = e => this.setState({ email: e.target.value });
    updatePassword = e => this.setState({ password: e.target.value });
    updatePasswordConfirm = e => this.setState({ passwordConfirm: e.target.value });

    // modal handling
    toggleLogin = () => this.props.toggleRegister(false);
    toggleRecover = () => this.props.toggleRecover(!this.props.recover);

    // registering the account
    register = e => {
        // prevents the page from refreshing when submitting the form
        e.preventDefault();

        this.props.updateLoading(true);

        const { username, email, password, passwordConfirm } = this.state;

        axios.post('/auth/register', { username, email, password, passwordConfirm })
        .then(res => {
            this.props.updateLoading(false);
            this.setState({
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',

                errorMessage: ''
            });

            this.props.updateUser(res.data);
            this.props.toggleModal(false);
        })
        .catch(err => this.setState({ errorMessage: err.response.data }));
    }

    render() {
        return (
            <div className="modal-form-container">
                <h1>Register an Account</h1>
                    {
                        this.props.loading && <Loading />
                    }
                    {
                        this.state.errorMessage && <h5 className="modal-form-error">{ this.state.errorMessage }</h5>
                    }
                <form className="modal-form-large" onSubmit={this.register}>
                    <input type="text" placeholder="Username" maxLength="12" onChange={this.updateUsername} required />
                    <input type="email" placeholder="Email Address" onChange={this.updateEmail} required />
                    <input type="password" placeholder="Password" minLength="10" maxLength="20" onChange={this.updatePassword} required />
                    <input type="password" placeholder="Confirm Password" minLength="10" maxLength="20" onChange={this.updatePasswordConfirm} required />

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
        recover: state.loginReducer.recover,
        loading: state.loginReducer.loading
    }
}

export default connect(mapStateToProps, { toggleModal, toggleRegister, toggleRecover, updateUser, updateLoading }) (Register);