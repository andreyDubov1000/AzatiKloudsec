import "./reset.scss";
import "./index.scss";
import Loader from "@component/atoms/Loader";
import ProtectedLayout from "@component/layouts/ProtectedLayout";
import MuiTheme from "@component/theme/MuiTheme";
import reduxStore from "@redux/reduxStore";
import React, { Suspense } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { simpleRoutes } from "routes";

const App = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <MuiTheme>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              {simpleRoutes.map((item) => (
                <Route {...item} key={item.path} />
              ))}
              <Route path="/" component={ProtectedLayout} />
            </Switch>
          </Suspense>
        </Router>
        <NotificationContainer />
      </MuiTheme>
    </ReduxProvider>
  );
};

export default App;
