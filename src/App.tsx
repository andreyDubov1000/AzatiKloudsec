import MuiTheme from "@component/theme/MuiTheme";
import Login from "pages/auth/Login";
import Signup from "pages/auth/Signup";
import ConfirmUser from "pages/auth/UserConfirmation";
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
          <Route path="/confirm" component={ConfirmUser} />
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
