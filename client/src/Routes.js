import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutWebsite from "./layouts/layoutWebsite";
import LoginPage from "./pages/website/user/Login";
import RegisterPage from "./pages/website/user/Register";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:path?">
          <LayoutWebsite>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
            </Switch>
          </LayoutWebsite>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
