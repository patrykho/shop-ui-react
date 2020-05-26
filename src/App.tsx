import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.scss';
import Products from './pages/products/products.page';
import Login from './pages/login/login.page';
import Register from './pages/register/register.page';
import FileUpload from './pages/file-upload/file-upload.page';
import UserProfile from './pages/user-panel/user-profile.page';
import ProductCreate from './pages/product/product-create.page';
import ProductEdit from './pages/product/product-edit.page';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={FileUpload} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/product/create" component={ProductCreate} />
          <Route path="/product/edit/:id" component={ProductEdit} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
