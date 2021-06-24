import Loader from "@component/atoms/Loader";
import DashboardLayout from "@component/layouts/DashboardLayout";
import MuiTheme from "@component/theme/MuiTheme";
import authRoutes from "@page/auth/authRoutes";
import reduxStore from "@redux/reduxStore";
import Home from "pages/home/Home";
import React, { Suspense } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <MuiTheme>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              {authRoutes.map((item) => (
                <Route
                  path={item.path}
                  component={item.component}
                  key={item.path}
                />
              ))}
              <Route path="/dashboard" component={DashboardLayout} />
              <Route path="/" component={Home} />
            </Switch>
          </Suspense>
        </Router>
        <NotificationContainer />
      </MuiTheme>
    </ReduxProvider>
  );
};

export default App;
