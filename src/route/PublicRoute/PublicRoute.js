import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn"

export default function PublicRoute({ Component, restricted, auth, path }) {
  return (
    <Route path={path}>
      {isLoggedIn() && restricted ? 
        <Redirect to="/documentList" /> 
        : <Component auth={auth} />} 
    </Route>
  );
};
