import React from "react";

// Modules/Libraries
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// Redux Functions
import store from "./store";

// Components
import App from "./App";
import history from "./history";

// CSS
import "../public/assets/plugins/nucleo/css/nucleo.css";
import "../public/assets/scss/argon-dashboard-react.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
