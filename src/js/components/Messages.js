import React from "react";
import MessageInput from "./MessageInput";
import "../../css/Messages.css";

export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingMember: undefined
    };
    this.onMessageAdded = this.onMessageAdded.bind(this);
  }
  componentWillMount() {
    this.fetchMessages(this.props.channel);
  }
  componentWillUnmount() {
    this.unregisterEventHandlers(this.props.channel);
  }
  componentDidUpdate(prevProps) {
    if (this.props.channel.sid !== prevProps.channel.sid) {
      this.unregisterEventHandlers(prevProps.channel);
      this.fetchMessages(this.props.channel);
    }
  }
  fetchMessages(channel) {
    channel.getMessages().then(list => {
      this.setState({
        messages: list.items
      });
      this.registerEventHandlers(channel);
    });
  }
  registerEventHandlers(channel) {
    channel.on("messageAdded", this.onMessageAdded);
    channel.on("typingStarted", member => {
      this.setState({
        typingMember: member
      });
    });
    channel.on("typingEnded", member => {
      this.setState({
        typingMember: undefined
      });
    });
  }
  unregisterEventHandlers(channel) {
    channel.removeListener("messageAdded", this.onMessageAdded);
  }
  onMessageAdded(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
  }
  sendTyping() {
    this.props.channel.typing();
  }
  sendMessage(message) {
    this.props.channel.sendMessage(message).then(index => {
      console.log("Message sent. index : " + index);
    });
  }
  render() {
    return (
      <div className="messages">
        <div className="messages-list">
          <ul className="list-unstyled ">
            {this.state.messages.map(m => {
              return (
                <li className="message-item" key={m.sid}>
                  <strong>{m.author}</strong>: {m.body}
                </li>
              );
            })}
          </ul>
        </div>
        <MessageInput
          typingMember={this.state.typingMember}
          sendTyping={this.sendTyping.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
        />
      </div>
    );
  }
}

export default Messages;
