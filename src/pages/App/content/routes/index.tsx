import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import ProductRoutes from '../pages/products/routes'
import Home from '../pages/home/pages';

const Content: React.FC = () =>{
  
  return (
    <Switch>
      <Route path="/app" exact>
        <Home />
      </Route>
      <Route path="/app/products">
        <ProductRoutes />
      </Route>
    </Switch>
  )}

export default Content;