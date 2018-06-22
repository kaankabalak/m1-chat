import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./Login";
import UserManangementApp from "./UserManagementApp";
import AdminApp from "./AdminApp";
import CustomerApp from "./CustomerApp";

const Landing = () => (
  <React.Fragment>
    <Link to={"users"}>Users</Link>
    <br />
    <Link to={"chat/admin"}>Chat Admin</Link>
    <br />
    <Link to={"chat/customer"}>Chat Customer </Link>
  </React.Fragment>
);

const AdminLogin = props => (
  <Login {...props} title={"Admin Chat"} redirect={"/chat/admin/"} />
);

const CustomerLogin = props => (
  <Login {...props} title={"Customer Chat"} redirect={"/chat/customer/"} />
);

export const App = () => (
  <Switch>
    <Route path={"/chat/admin/:sid"} component={AdminApp} />
    <Route path={"/chat/admin"} component={AdminLogin} />
    <Route path={"/chat/customer/:sid"} component={CustomerApp} />
    <Route path={"/chat/customer"} component={CustomerLogin} />
    <Route path={"/"} component={UserManangementApp} />
  </Switch>
);

export default App;
