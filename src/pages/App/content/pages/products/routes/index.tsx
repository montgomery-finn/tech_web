import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import List from '../pages/list'
import Create from '../pages/create'

const Products: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app/products" exact>
          <List />
        </Route>
        <Route path="/app/products/create" >
          <Create />
        </Route>
      </Switch>
    </Router>
  );
}

export default Products;