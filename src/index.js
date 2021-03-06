import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";

import App from "./components/App/App";
import Authenticate from "./service/authenticate";
import GlobalStyle from "./style/GlobalStyle";

const auth = new Authenticate();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <App auth={auth} />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
