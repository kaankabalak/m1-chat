import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./js/history";
import "./css/index.css";
import "./css/App.css";
import App from "./js/App";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
