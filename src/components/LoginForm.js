import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';



class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {action:'https://testrt.peplink.com/api/login', username: '', password: '', token: '', redirectUrl: 'https://testrt.peplink.com/api/authorizations/google'};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        const axiosInstance = axios.create({
            baseURL: this.state.action,
            timeout: 600000
        });



        event.preventDefault();
    }

    render() {

        const responseGoogle = (response) => {
            console.log(response);
        }

        return(
            <div>
                <div className="row">
                    <GoogleLogin
                        clientId={'339690919651-32pc6ktvgrc607oap04kmemkg62lkbc6.apps.googleusercontent.com'}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        redirectUri={this.state.redirectUrl}
                    >
                        <FontAwesome
                            name='google'
                        />
                        <span> Login with Google</span>
                    </GoogleLogin>
                </div>
                <div className="row">
                    - OR -
                </div>
                <div className="row">
                    <form id="loginForm" action={this.state.action} method="post">
                        <input type="hidden" name="redirectUrl" value={this.state.redirectUrl} />
                        <div className="row">
                            <label className="col-lg-4 display-4" htmlFor="txtUsername"><strong>Username:</strong></label>
                            <input type="text" id="txtUsername" name="username" value={this.state.username} onChange={this.handleUsernameChange} className="col-lg-8" />
                        </div>
                        <div className="row">
                            <label className="col-lg-4 display-4" htmlFor="txtPassword"><strong>Password:</strong></label>
                            <input type="password" id="txtPassword" name="password" value={this.state.password} onChange={this.handlePasswordChange} className="col-lg-8" />
                        </div>
                        <div className="row">
                            <button className="btn btn-primary login">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;