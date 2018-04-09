import React, { Component } from 'react';
import logo from './images/ploverbay.png';
import './App.css';
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Ticket Conversation</h1>
            </header>
            <div className="container d-flex h-100">
                <div className="row align-self-center w-100">
                    <div className="col-4 mx-auto">
                        <div className="jumbotron">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
