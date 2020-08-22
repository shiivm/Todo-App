import React from "react";
import { connect } from "react-redux";

import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes";

const RenderRoutes = ({ routes, isAuthenticated }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return !route.isProtected ? (
          <Route
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} />}
            key={route.key}
          />
        ) : (
          <ProtectedRoute
            key={route.key}
            path={route.path}
            exact={route.exact}
            isAuthenticated={isAuthenticated}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, null)(RenderRoutes);
