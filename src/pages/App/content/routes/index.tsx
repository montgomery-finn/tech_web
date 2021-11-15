import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import ProductRoutes from '../pages/products/routes'

const Content: React.FC = () =>{
  
  return (
    <Switch>
      <Route path="/app/products">
        <ProductRoutes />
      </Route>
    </Switch>
  )}

export default Content;