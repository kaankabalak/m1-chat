import React from "react";
import { withRouter } from "react-router-dom";
import api from "../api";
import ChatWindow from "./ChatWindow";

export class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      token: ""
    };
  }
  componentWillMount() {
    api
      .getUser(this.props.match.params.sid)
      .then(user => {
        window.document.title = user.fullname || user.username;
        this.setState({
          user: user
        });
        return user.username;
      })
      .then(username => {
        api.getAuthToken(username).then(token => {
          this.setState({
            token: token
          });
        });
      });
  }
  render() {
    if (!this.state.user || !this.state.token) {
      return <noscript />;
    }
    return <ChatWindow user={this.state.user} token={this.state.token} />;
  }
}

export default withRouter(ChatApp);
