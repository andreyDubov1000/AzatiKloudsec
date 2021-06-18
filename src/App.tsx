import MuiTheme from "@component/theme/MuiTheme";
import AccountConfirmation from "pages/auth/AccountConfirmation";
import Login from "pages/auth/Login";
import PasswordConfirmation from "pages/auth/PasswordConfirmation";
import Signup from "pages/auth/Signup";
import Home from "pages/Home";
import React from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <MuiTheme>
      <Router>
        <Switch>
          <Route path="/confirm-password" component={PasswordConfirmation} />
          <Route path="/confirm-account" component={AccountConfirmation} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <NotificationContainer />
    </MuiTheme>
  );
};

export default App;
