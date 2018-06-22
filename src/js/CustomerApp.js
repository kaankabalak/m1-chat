import React from "react";
import ChatApp from "./components/ChatApp";
import api from "./api";
import "../css/Customer.css";

export class CustomerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChat: false,
      user: {}
    };
  }
  componentWillMount() {
    api.getUser(this.props.match.params.sid).then(user => {
      this.setState({
        user: user
      });
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.user.fullname}</h1>
        <button
          className="btn btn-primary btn-chat"
          onClick={() => this.setState({ showChat: !this.state.showChat })}
        >
          {this.state.showChat ? "Close" : "Chat"}
        </button>
        <div
          style={{ display: this.state.showChat ? "block" : "none" }}
          className="chat-wrapper"
        >
          <ChatApp />
        </div>
      </div>
    );
  }
}

export default CustomerApp;
