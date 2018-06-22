import React from "react";
import classNames from "classnames";

export class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: 0
    };
  }
  render() {
    const { channel, isActive, selectChannel } = this.props;
    return (
      <li
        className={classNames({
          "channel-item": true,
          "channel-item--active": isActive,
          "channel-item--unread": this.state.unreadCount > 0
        })}
      >
        <a
          href=""
          onClick={e => {
            e.preventDefault();
            selectChannel(channel);
          }}
        >
          <div>
            {channel.friendlyName}
            {this.state.unreadCount > 0 && <span> *</span>}
          </div>
        </a>
      </li>
    );
  }
}

export default Channel;
