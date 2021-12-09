import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import ProductRoutes from '../pages/products/routes'
import Home from '../pages/home';
import History from '../pages/history';

const Content: React.FC = () =>{
  
  return (
    <Switch>
      <Route path="/app" exact>
        <Home />
      </Route>
      <Route path="/app/products">
        <ProductRoutes />
      </Route>
      <Route path="/app/history">
        <History />
      </Route>
    </Switch>
  )}

export default Content;