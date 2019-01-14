import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleRegister, toggleRecover } from '../../ducks/loginReducer';

class RecoverAccount extends Component {

    toggleLogin = () => this.props.toggleRecover(false);

    toggleRegister = () => this.props.toggleRegister(!this.props.register);

    render() {
        return (
            <div className="modal-form-container">
                <h1>Recover an Account</h1>
                <form className="modal-form">
                    <input type="email" placeholder="Email Address"/>

                    <input type="submit" value="Recover" />

                    <div className="modal-form-help">
                        <button type="button" onClick={this.toggleLogin}>Login Instead</button> &bull; <button type="button" onClick={this.toggleRegister}>Register</button>
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

export default connect(mapStateToProps, { toggleRegister, toggleRecover }) (RecoverAccount);