import MuiTheme from "@component/theme/MuiTheme";
import reduxStore from "@redux/reduxStore";
import AccountConfirmation from "pages/auth/AccountConfirmation";
import ForgotPassword from "pages/auth/ForgotPassword";
import Login from "pages/auth/Login";
import PasswordConfirmation from "pages/auth/PasswordConfirmation";
import ResetPassword from "pages/auth/ResetPassword";
import Signup from "pages/auth/Signup";
import Dashboard from "pages/Dashboard";
import Home from "pages/home/Home";
import React from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <MuiTheme>
        <Router>
          <Switch>
            <Route path="/confirm-account" component={AccountConfirmation} />
            <Route path="/confirm" component={PasswordConfirmation} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/resend-otp" component={ForgotPassword} exact />
            <Route path="/forgot-password" component={ResetPassword} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
        <NotificationContainer />
      </MuiTheme>
    </ReduxProvider>
  );
};

export default App;
