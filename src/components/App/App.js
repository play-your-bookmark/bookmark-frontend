import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "../../route/PublicRoute/PublicRoute";
import AuthRoute from "../../route/AuthRoute/AuthRoute";
import Tree from "../Tree/Tree";

function App() {
  return (
    <div>
      <Switch>
        <PublicRoute />
        <AuthRoute />
      </Switch>
    </div>
  );
}

export default App;
