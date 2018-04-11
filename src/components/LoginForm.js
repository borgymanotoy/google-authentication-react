import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';



class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {action:'http://localhost:8001/api/login', username: '', password: '', token: '', redirectUrl: 'http://localhost:8001/api/authorizations/google'};
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
            var googleUser = {};
            googleUser.googleId = response.googleId;
            googleUser.tokenId = response.tokenId;
            googleUser.accessToken = response.accessToken;
  
            var profile = {};
            profile.googleId = response.profileObj.googleId;
            profile.name = response.profileObj.name;
            profile.givenName = response.profileObj.givenName;
            profile.familyName = response.profileObj.familyName;
            profile.email = response.profileObj.email;
            profile.imageUrl = response.profileObj.imageUrl;
            googleUser.profileObj = profile;

            var token = {};
            token.tokenType = response.tokenObj.token_type;
            token.accessToken = response.tokenObj.access_token;
            token.idToken = response.tokenObj.id_token;
            token.idpId = response.tokenObj.idpId;
            token.loginHint = response.tokenObj.login_hint;
            token.scope = response.tokenObj.scope;
            token.firstIssuedAt = response.tokenObj.first_issued_at;
            token.expiresAt = response.tokenObj.expires_at;
            token.expiresIn = response.tokenObj.expires_in;
            googleUser.tokenObj = token;

            axios.post('http://localhost:8001/api/authorizations/google', googleUser)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                alert(error);
              });
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