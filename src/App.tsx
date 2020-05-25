import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.scss';
import Products from './pages/products/products.page';
import Login from './pages/login/login.page';
import Register from './pages/register/register.page';
import Product from './pages/product/product.page';
import FileUpload from './pages/file--upload/file-upload.page';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
          <Route path="/uploud" component={FileUpload} />
          <Route path="/:id" component={Product} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
