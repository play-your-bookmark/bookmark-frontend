import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Authenticate from "./service/authenticate";

const auth = new Authenticate();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App auth={auth}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
