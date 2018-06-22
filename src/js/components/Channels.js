import React from "react";
import Channel from "./Channel";

export class Channels extends React.Component {
  render() {
    const { channels, currentChannel, selectChannel } = this.props;
    return (
      <div className="channels">
        <h2>CHANNELS</h2>
        <ul className="list-unstyled channel-list">
          {channels.map(ch => {
            return (
              <Channel
                key={ch.sid}
                channel={ch}
                isActive={currentChannel && currentChannel.sid === ch.sid}
                selectChannel={selectChannel}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Channels;
