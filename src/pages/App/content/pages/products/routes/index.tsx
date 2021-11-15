import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import List from '../pages/list'
import Create from '../pages/create'
import Edit from '../pages/edit';

const Products: React.FC = () => {
  return (
    <Switch>
      <Route path="/app/products/create" >
        <Create />
      </Route>
      <Route path="/app/products/edit" >
        <Edit />
      </Route>
      <Route path="/app/products">
        <List />
      </Route>
    </Switch>
  );
}

export default Products;