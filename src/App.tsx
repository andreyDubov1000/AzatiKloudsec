import MuiTheme from "@component/theme/MuiTheme";
import Home from "pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <MuiTheme>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </MuiTheme>
  );
};

export default App;
