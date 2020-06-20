import React, { Component } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import "./index.css";

class Home extends Component {
  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated() && <HomePage logout={this.logout} />}
        {!isAuthenticated() && <LoginPage login={this.login} />}
      </div>
    );
  }
}

export default Home;
