import React from "react";
import "../../css/Members.css";

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }
  componentDidMount() {
    this.props.channel
      .getMembers()
      .then(list => {
        let promises = list.map(m => {
          return m.getUser();
        });
        return Promise.all(promises);
      })
      .then(members => {
        this.setState({
          members
        });
        this.registerEventHandlers();
      });
  }
  registerEventHandlers() {
    this.props.channel.on("memberJoined", member => {
      member.getUser().then(m => {
        this.setState({
          members: [...this.state.members, m]
        });
      });
    });
  }
  render() {
    return (
      <div className="members">
        <h2>MEMBERS</h2>
        <ul className="list-unstyled member-list">
          {this.state.members.map(m => {
            return (
              <li className="member-item" key={m.identity}>
                {m.friendlyName || m.identity}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Members;
