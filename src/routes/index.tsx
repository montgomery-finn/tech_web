import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Signup from '../pages/signup';
import Signin from '../pages/signin';
import Content from '../pages/App/index';

export default function App() {
  return (
    <Switch>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/app">
        <Content />
      </Route>
      <Route path="/" exact>
        <Signin />
      </Route>
    </Switch>
  );
}

