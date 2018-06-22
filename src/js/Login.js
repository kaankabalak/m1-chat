import React from "react";
import "../css/Login.css";
import history from "./history";
import api from "./api";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
  }
  login(e) {
    e.preventDefault();
    api.getUserByUsername(this.state.user).then(user => {
      history.push(this.props.redirect + user.sid);
    });
  }
  render() {
    return (
      <div className="login-page text-center">
        <form onSubmit={this.login.bind(this)} className="form--login">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <input
            type="text"
            placeholder="Username"
            className="form-control username mb-3"
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
