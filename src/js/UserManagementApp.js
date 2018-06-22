import React from "react";
import api from "./api";
import history from "./history";
import "../css/User.css";

export class UserManagementApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: "",
      fullname: "",
      isAdmin: false
    };
  }
  componentDidMount() {
    this.fetchUsers();
    window.document.title = "Users";
  }
  fetchUsers() {
    api.getUsers().then(users => {
      this.setState({ users: users });
    });
  }
  reset() {
    api.reset().then(() => {
      window.location.reload();
    });
  }
  createUser(e) {
    e.preventDefault();
    api
      .createUser(this.state.username, this.state.fullname, this.state.isAdmin)
      .then(res => {
        this.setState({
          users: [
            ...this.state.users,
            {
              sid: res.sid,
              username: this.state.username,
              fullname: this.state.fullname,
              isAdmin: this.state.isAdmin
            }
          ],
          username: "",
          fullname: "",
          isAdmin: false
        });
      });
  }
  render() {
    return (
      <div className="users-page">
        <h1>Users</h1>
        <button
          className="btn btn-danger float-right"
          onClick={this.reset.bind(this)}
        >
          Reset
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Fullname</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {
              return (
                <tr key={user.sid}>
                  <td>{user.username}</td>
                  <td>{user.fullname}</td>
                  <td>
                    {user.isAdmin ? "Admin" : "Customer"}{" "}
                    <a
                      href={
                        user.isAdmin
                          ? "/chat/admin/" + user.sid
                          : "/chat/customer/" + user.sid
                      }
                      target="_blank"
                    >
                      Login
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form onSubmit={this.createUser.bind(this)} className="form--login">
          <h1 className="h3 mb-3 font-weight-normal">Create a new user</h1>
          <input
            type="text"
            placeholder="Username"
            className="form-control username mb-3"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Fullname"
            className="form-control username mb-3"
            value={this.state.fullname}
            onChange={e => this.setState({ fullname: e.target.value })}
          />
          <div className="checkbox mb-3">
            <label htmlFor="is-admin">
              <input
                id="is-admin"
                type="checkbox"
                value="on"
                checked={this.state.isAdmin}
                onChange={() => this.setState({ isAdmin: !this.state.isAdmin })}
              />{" "}
              Admin user
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Add User
          </button>
        </form>
      </div>
    );
  }
}

export default UserManagementApp;
