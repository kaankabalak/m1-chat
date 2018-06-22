import React from "react";
import TwilioChat from "twilio-chat";
import Messages from "./Messages";
import Members from "./Members";
import Sidebar from "./Sidebar";

export class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      currentChannel: undefined,
      initialized: false
    };
  }
  componentWillMount() {
    const { token } = this.props;
    TwilioChat.create(token).then(client => {
      this.tc = client;
      this.tc.getSubscribedChannels().then(list => {
        const channels = list.items;
        if (channels.length > 0) {
          this.setState({
            channels: channels
          });
          this.selectChannel(channels[0]);
        }
        this.setState({
          initialized: true
        });
        this.registerEventHandlers();
      });
    });
  }
  registerEventHandlers() {
    this.tc.on("channelAdded", channel => {
      this.setState({
        channels: [...this.state.channels, channel]
      });
      if (!this.state.currentChannel) {
        this.selectChannel(channel);
      }
    });
  }
  selectChannel(channel) {
    this.setState({
      currentChannel: channel
    });
  }
  render() {
    return (
      <div className="chat-window">
        {this.state.initialized && (
          <React.Fragment>
            {this.props.user.isAdmin && (
              <Sidebar
                user={this.props.user}
                channels={this.state.channels}
                currentChannel={this.state.currentChannel}
                selectChannel={this.selectChannel.bind(this)}
              />
            )}
            {this.state.currentChannel && (
              <React.Fragment>
                <Messages channel={this.state.currentChannel} />
                <Members channel={this.state.currentChannel} />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ChatWindow;
