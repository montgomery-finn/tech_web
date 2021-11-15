import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductRoutes from '../pages/products/routes'

const Content: React.FC = () =>{
  
  return (
    <Router>
      <Switch>
        <Route path="/app/products">
          <ProductRoutes />
        </Route>
      </Switch>
    </Router>
  )}

export default Content;