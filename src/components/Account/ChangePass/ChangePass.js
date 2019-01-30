import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './change-pass.css';

class ChangePass extends Component {

    state = {
        current: '',
        newPass: '',
        errorMessage: ''
    }

    // onChange handling
    updateCurrent = e => this.setState({ current: e.target.value });
    updateNew = e => this.setState({ newPass: e.target.value });

    changePass = e => {
        e.preventDefault();
        const { current, newPass } = this.state;

        axios.put('/auth/change-pass', { current, newPass })
        .then(() => this.props.history.push("/"))
        .catch(err => this.setState({ errorMessage: err.response.data }));
    }

    render() {
        if (!this.props.user.username) {
            return <Redirect to="/" />
        }

        console.log("redner");
        return (
            <div className="change-pass">
                    <h2>Change Your Password</h2>
                { this.state.errorMessage && <h5 className="err-message">{ this.state.errorMessage }</h5> }
                <form onSubmit={this.changePass}>
                    <input placeholder="Current Password" type="password" minLength="10" maxLength="20" onChange={this.updateCurrent} required />
                    <input placeholder="New Password" type="password" minLength="10" maxLength="20" onChange={this.updateNew} required />
                    <input type="submit"/>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => state.userReducer;

export default connect(mapStateToProps) (ChangePass);