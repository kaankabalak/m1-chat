import React from "react";

export class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  send(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }
  render() {
    return (
      <div className="message-input">
        {this.props.typingMember && (
          <div className="message-typing">
            <i>{this.props.typingMember.identity} is typing</i>
          </div>
        )}
        <form className="message-input-form" onSubmit={this.send.bind(this)}>
          <input
            type="text"
            placeholder="Send a message"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyPress={this.props.sendTyping}
          />
        </form>
      </div>
    );
  }
}

export default MessageInput;
