import React from "react";
import { Route, Router } from "react-router-dom";
import LandingPage from "./LandingPage";
import Callback from "./Callback";
import Auth from "./auth";
import history from "./history";
import "./index.css";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes = () => (
  <Router history={history} component={LandingPage}>
    <div>
      <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />
      <Route path="/home" render={props => <LandingPage auth={auth} {...props} />} />
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
    </div>
  </Router>
);

export default Routes;
