import React from "react";
import Channels from "./Channels";
import "../../css/Sidebar.css";

const UserInfo = ({ user }) => <div className="user-info">{user.fullname}</div>;

export const Sidebar = props => (
  <div className="sidebar">
    <UserInfo user={props.user} />
    <Channels {...props} />
  </div>
);

export default Sidebar;
