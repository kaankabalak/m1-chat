import React from "react";
import ChatApp from "./components/ChatApp";
import "../css/Admin.css";

export class AdminApp extends React.Component {
  render() {
    return (
      <div className="admin-page">
        <ChatApp />
      </div>
    );
  }
}

export default AdminApp;
