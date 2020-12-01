import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

class LandingPage extends Component {
  state = {
    heading: "Here at BüK",
    login: true,
  };

  onLogin = (event) => {
    this.setState({
      login: !this.state.login,
    });
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_4">
            <p>
              we have decided that books lent out to friends, will no longer go
              missing.
            </p>
            <p>
              BüK is a system to not only catalague your books simply and
              easily, but also keep track of who currently has each book in your
              collection.
            </p>
          </div>
          <div className="grid-col grid-col_8">
            {this.state.login ? <LoginForm /> : <RegisterForm />}
            <center>
              {this.state.login ? (
                <>
                  <h4>Not registered yet?</h4>
                  <button className="btn btn_sizeSm" onClick={this.onLogin}>
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  <h4>Alread have an account?</h4>
                  <button className="btn btn_sizeSm" onClick={this.onLogin}>
                    Log in
                  </button>
                </>
              )}
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
