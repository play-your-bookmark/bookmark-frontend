import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";

function AuthRoute({ Component, path, auth }) {
  return (
    <Route path={path}>
      {isLoggedIn() ? 
        <Component auth={auth} /> : <Redirect to="/login"/>}
    </Route>
  );
}

export default AuthRoute;
